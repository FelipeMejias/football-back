import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { indicar } from './src/adicionadas/indicar.js'
import { buildApostas } from './src/especiais/buildApostas.js'
import { ligas } from './src/bancos.js'
import { buildFutura } from './src/especiais/buildFutura.js'
import { buildResultado } from './src/profundo/resultado.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4002
app.listen(port,()=>console.log(`listening on port ${port}`))

export const tetoPosicao=5
indicar()
function calcularEV(chance,odd,k,g){
    const numero=odd*chance*k
    const resp=numero-(100-chance)*g
    return resp
}
const camps=['ing','fra','ale']
const tipos=['1','2','6']
const amostraMinima=45
function tr(){
    const listaTotal=[]
    
    const apostasRaw=buildApostas(3)
    for(let uv=80;uv<100;uv++){
        for(let g=0.9;g<1.1;g+=0.01){
            for(let k=0.9;k<1.1;k+=0.01){
                const no=nova(apostasRaw,k,g,uv)
                
                if(no.lucro)listaTotal.push(no)
            }
        }

    }
    
    let cont=0
    const resp=listaTotal.filter(obj=>obj.amostra>amostraMinima)
    const resposta=resp.sort((a,b)=>{if(a.taxa>b.taxa){return -1}else{return true}})
    while(cont<10){
        console.log(resposta[cont])
        cont++
    }
}
    

function nova(apostasRaw,k,g,evMinimo){
    const apostas=apostasRaw.filter(a=>{
    const caso=calcularEV(a.chance,a.odd,k,g)
    return (camps.includes(a.camp.replace('1',''))&&
        tipos.includes(a.info[0])&&
        caso>=evMinimo)})
    let din=0;let ganho=0;let red=0;let green=0;
    for(let ap of apostas){
        if(ap.green===null||ap.green===undefined){
            din++
            ganho+=ap.odd
        }else{
            din++
            if(ap.green)ganho+=ap.odd
            if(ap.green){green++}else{red++}
        }
    }
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=Math.round((lucroRaw%1)*100)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium)
    return {
        k:k.toFixed(2),
        g:g.toFixed(2),
        ev:evMinimo,
        lucro,
        
        taxa:porc,
        amostra:din,
    }
}
function grande(){
    const camps=[
        'ing1',
        'ale1',
        'fra1',
        'ita1',
        //'esp1',
    ]
    const tipos=['1','2',]
    const resposta=[]
    for(let k=85;k<95;k++){
        const ev=k
        const apostas=buildApostas(3).filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
        let din=0;let ganho=0;let red=0;let green=0;
        let jogo
        let lista=[]
        for(let p=0;p<apostas.length;p++){
            const ap=apostas[p]
            const w=ap.nome
            const thisGame=w[0]+w[1]+w[2]+w[3]+w[4]+w[5]+w[6]+w[7]+w[8]+w[9]
            if(thisGame!=jogo){
                jogo=thisGame
                for(let apostaSelecionada of lista){
                    din++
                    if(apostaSelecionada.green)ganho+=apostaSelecionada.odd
                    if(apostaSelecionada.green){green++}else{red++}
                }
                lista=[]
            }
            let naofoi=true
            const novaLista=[]
            for(let apostaInclusa of lista){
                if(apostaInclusa.info==ap.info&&naofoi){
                    if(apostaInclusa.ev<ap.ev){
                        novaLista.push(ap)
                    }else{
                        novaLista.push(apostaInclusa)
                    }
                    naofoi=false
                }else{
                    novaLista.push(apostaInclusa)
                }
            }
            if(naofoi)novaLista.push(ap)
            lista=[...novaLista]
        }
        let din2=0;let ganho2=0;let red2=0;let green2=0;
        for(let apo of apostas){
            din2++
            if(apo.green)ganho2+=apo.odd
        }
        const lucro=calcularLucro(ganho,din)
        const lucro2=calcularLucro(ganho2,din2)
        resposta.push({ev,amostra:din2,lucro:parseFloat(lucro2)})
        //console.log(`ev ${ev} antigo[ ${din2} lucro ${lucro2}]`)
    }/*
    let cont=0
    for(let item of resposta)cont+=item.lucro
    console.log(cont)*/
    const ordenada= resposta.sort((a,b)=>{
        let caso=false
        if(a.lucro==b.lucro&&a.amostra>b.amostra){caso=true}else if(a.lucro>b.lucro){caso=true}
        if(caso){return -1}else{return true}
    })
    console.log(ordenada)   
}




function calcularLucro(ganho,din){
    const lucroRaw=ganho/din
    const lucroMedium=((lucroRaw%1)*100).toFixed(1)
    return lucroRaw>1?lucroMedium:-(100-lucroMedium)
}