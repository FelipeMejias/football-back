import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { buildFutura } from './src/especiais/buildFutura.js'
import { buildContext } from './src/bancos.js'
import { criarOrdemDuplaAposta } from "./src/adicionadas/indicar.js"
import detalhar from './src/adicionadas/detalhar.js'
import { buildApostas } from './src/especiais/buildApostas.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4003
app.listen(port,()=>console.log(`listening on port ${port}`))

export const tetoPosicao=5
indicar('',2)


function indicar(campeonato,phase){
    const futuras=buildFutura()
    for(let partida of futuras){
        const {camp,mandante,visitante}=partida
        if(camp==`${campeonato}1`){
            const context=buildContext(camp)
            criarOrdemDuplaAposta(context,camp,mandante,visitante,phase)
        }
    }
}


//###################################################################
function todas(){
    const apostas=buildApostas(3)
    const apostasAberto=buildApostas(1)
}
function auto(){
    
    const apostas=buildApostas(3)
    const apostasAberto=buildApostas(1)
    
    for(let k=35;k<95;k++){
        let din=0
        let ganho=0
        for(let ap of apostas){
            if(ap.chance>=k){
                din++
                if(ap.green)ganho+=ap.odd
            }
        }
        console.log(`${k}----${(ganho/din).toFixed(2)}----${din}`)
    }
    console.log('==========================================')
    for(let k=0;k<200;k++){
        let din=0
        let ganho=0
        for(let ap of apostas){
            if(ap.ev>=k){
                din++
                if(ap.green)ganho+=ap.odd
            }
        }
        if(din)console.log(`${k}----${(ganho/din).toFixed(2)}----${din}`)
    }
    
    
}
function individual(){
    const apostas=buildApostas(3)
    for(let camp of ['ing1','esp1','ita1','ale1','fra1']){
        let din=0
        let ganho=0
        let red=0
        let green=0
        for(let ap of apostas.filter(a=>(a.camp==camp))){
                din++
                if(ap.green)ganho+=ap.odd
                if(ap.green){green++}else{red++}
        }
        console.log(camp,'lucro:'+(ganho/din).toFixed(2),'greens:'+green,'reds:'+red)
    }
    for(let tipo of [{nome:'vitoria',num:1},{nome:'gols',num:2},{nome:'escanteio',num:6}]){
        let din=0
        let ganho=0
        let red=0
        let green=0
        for(let ap of apostas.filter(a=>a.info[0]==tipo.num)){
                din++
                if(ap.green)ganho+=ap.odd
                if(ap.green){green++}else{red++}
        }
        console.log(tipo.nome,'lucro:'+(ganho/din).toFixed(2),'greens:'+green,'reds:'+red)
        //console.log(tipo.nome,(ganho/din).toFixed(2),din)
    }
    let din=0
        let ganho=0
        let red=0
        let green=0
        for(let ap of apostas.filter(a=>a.info[0]!=6)){
                din++
                if(ap.green)ganho+=ap.odd
                if(ap.green){green++}else{red++}
        }
        console.log('lucro:'+(ganho/din).toFixed(2),'greens:'+green,'reds:'+red)
}//individual()
function multipla(){
    const apostas=buildApostas(3)
    const apostasAberto=buildApostas(1)
    for(let k=35;k<95;k++){
        let din=0
        let ganho=1
        for(let ap of apostas){
            if(ap.chance>=k){
                din++
                if(ap.green){ganho*=ap.odd}else{ganho=0}
            }
        }
        if(ganho==0)continue
        let din2=0
        let ganho2=1
        for(let ap of apostasAberto){
            if(ap.chance>=k){
                din2++
                ganho2*=ap.odd
            }
        }
        console.log(`${k}------${ganho.toFixed(2)}------${din}------${ganho2.toFixed(2)}-------${din2}`)
    }


    const filtrada=apostasAberto.filter(ap=>ap.chance>=83)
    let total=0
    const qtd=filtrada.length
    for(let k=0;k<qtd;k++){
        let ganho=1
        for(let m=0;m<qtd;m++){
            if(m!=k)ganho*=filtrada[m].odd
        }
        total+=ganho
    }
    console.log(total/qtd)
}
//multipla()



