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

function auto(){
    
    const apostas=buildApostas(3)
    
    /*let din=0
        let ganho=0
        for(let ap of apostas){
            if(ap.info[0]!=6){
                din++
                if(ap.green)ganho+=ap.odd
            }
        }
        console.log((ganho/din).toFixed(2),din)
   */ 
    for(let k=35;k<90;k++){
        let din=0
        let ganho=1
        for(let ap of apostas){
            if(ap.chance>=k&&ap.info[0]!=6){
                din++
                if(ap.green){ganho*=ap.odd}else{ganho=0}
            }
        }
        console.log(`chance:${k} ganho:${(ganho).toFixed(2)} qtdApostas:${din}`)
    }
    
    for(let k=35;k<90;k++){
        let din=0
        let ganho=0
        for(let ap of apostas){
            if(ap.chance>=k){
                din++
                if(ap.green)ganho+=ap.odd
            }
        }
        console.log(`chance:${k} ganho:${(ganho/din).toFixed(2)} qtdApostas:${din}`)
    }
    for(let k=90;k<200;k++){
        let din=0
        let ganho=0
        for(let ap of apostas){
            if(ap.ev>=k){
                din++
                if(ap.green)ganho+=ap.odd
            }
        }
        if(ganho)console.log(`ev:${k} ganho:${(ganho/din).toFixed(2)} qtdApostas:${din}`)
    }
    
   /*
    for(let camp of ['ing1','esp1','ita1','ale1']){
        let din=0
        let ganho=0
        for(let ap of apostas.filter(a=>a.camp==camp)){
                din++
                if(ap.green)ganho+=ap.odd
        }
        console.log(camp,(ganho/din).toFixed(2),din)
    }
    */
   /*
    for(let tipo of [{nome:'vitoria',num:1},{nome:'gols',num:2},{nome:'escanteio',num:6}]){
        let din=0
        let ganho=0
        for(let ap of apostas.filter(a=>a.info[0]==tipo.num)){
                din++
                if(ap.green)ganho+=ap.odd
        }
        console.log(tipo.nome,(ganho/din).toFixed(2),din)
    }*/
    /*
    let green=0
    let red=0
    for(let ap of apostas.filter(a=>a.info[0]==6)){

        if(ap.green){green++}else{red++}
    }
    console.log(green,red)*/
}
auto()


function indicar(){
    const futuras=buildFutura()
    for(let partida of futuras){
        const {camp,mandante,visitante}=partida
        if(camp=='fra1'){
            const context=buildContext(camp)
            criarOrdemDuplaAposta(context,camp,mandante,visitante,1)
        }
    }
}


