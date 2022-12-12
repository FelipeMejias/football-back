import { buildContext } from "./bancos.js"
import { partidasRodada } from "./src-tabelas/partidasRodada.js"
import { totalResultado } from "./src-tabelas/totalResultado.js"
import chalk from 'chalk'
const possibles=[ 0.01 , 0.05 , 0.1 , 0.15 , 0.2 , 0.25 , 0.3 , 0.4 , 0.5 , 0.6 , 0.7 , 0.8 , 0.9 , 1 , 1.1 , 1.2 , 1.3 , 1.5 , 1.7 , 2 , 2.3 , 2.6 , 2.9 , 3.2]
const camp='ing1'
let rod=16

const casaIdeal=0.01
const foraIdeal=0.01
function rodada(camp,num,pesoCasa,pesoTomar){
    const pesoFora=pesoTomar

    const contextRodada=buildContext(camp,[])
    const partidas=partidasRodada(contextRodada,num)
    const context=buildPassado(camp,num)
    const sem= totalResultado(context,[],38,0,0)
    const casa= totalResultado(context,[],38,1,0)
    const fora= totalResultado(context,[],38,2,0)
    let total=0
    
    partidas.forEach((part,index) => {
        
        const {mandante,visitante,placar,rodada}=part
        /*
        const mandPro1=achar(casa,mandante,4)
        const mandPro0=achar(sem,mandante,4)
        const visiCon1=achar(fora,visitante,6)
        const visiCon0=achar(sem,visitante,6)

        const visiPro1=achar(casa,visitante,4)
        const visiPro0=achar(sem,visitante,4)
        const mandCon1=achar(fora,mandante,6)
        const mandCon0=achar(sem,mandante,6)
        const divisao=1 + pesoTomar + pesoCasa + pesoCasa*pesoTomar
        const mediaMand=( mandPro0 + pesoTomar*visiCon0 + pesoCasa*mandPro1 + pesoTomar*pesoCasa*visiCon1 )/divisao
        const mediaVisi=( visiPro0 + pesoTomar*mandCon0 + pesoCasa*visiPro1 + pesoTomar*pesoCasa*mandCon1 )/divisao
*/
        const mand0=achar(sem,mandante,5)
        const mand1=achar(casa,mandante,5)
        const visi0=achar(sem,visitante,5)
        const visi1=achar(fora,visitante,5)

        const divisao=2  + pesoCasa + pesoFora
        const media=( mand0 + mand1*pesoCasa + visi0 + visi1*pesoFora )/divisao
        const somaGols=placar[0]+placar[1]
        
        const chute1=Math.ceil(media)
        const chute2=Math.floor(media)
        if(media>3){
            if(somaGols<3){
                total++
               // console.log(chalk.red(`media: ${media.toFixed(1)} ; somaPlacar: ${somaGols} ; numeros: ${mand0}  ${mand1}  ${visi0}  ${visi1}`))
            }else{
               // console.log(chalk.green(`media: ${media.toFixed(1)} ; somaPlacar: ${somaGols} ; numeros: ${mand0}  ${mand1}  ${visi0}  ${visi1}`))
            }
        }else{
            if(somaGols!==chute1 && somaGols!==chute2){
                total++
              //  console.log(chalk.red(`media: ${media.toFixed(1)} ; somaPlacar: ${somaGols} ; numeros: ${mand0}  ${mand1}  ${visi0}  ${visi1}`))
            }else{
              //  console.log(chalk.green(`media: ${media.toFixed(1)} ; somaPlacar: ${somaGols} ; numeros: ${mand0}  ${mand1}  ${visi0}  ${visi1}`))
            }
        }
        
        //total+=difere
        /*
        total+=dif(mediaMand,placar[0])
        total+=dif(mediaVisi,placar[1])
        */
    });
    
   return total
}

export function principalf(){
    while(rod>2){
        let melhor=Infinity
        let qual
        for(let ca=0;ca<23;ca++){
            for(let ta=0;ta<23;ta++){
                const c=possibles[ca]
                const t=possibles[ta]
                const v=rodada(camp,rod,c,t)
                if(v<melhor){
                    melhor=v
                    qual=`pesoCasa: ${c} ; pesoFora: ${t}`
                }
            }
        }
        console.log(`${camp.replace('1','')} ${rod} == ${qual}`)
        rod--
    }
    
}

export function principal(){
    for(let r=rod;r>2;r--){
        const wrong=rodada(camp,r,casaIdeal,foraIdeal)
        console.log('/')
        console.log(r)
        console.log(chalk.green(10-wrong))
        console.log(chalk.red(wrong))
        console.log('/')
    }
    
}

function achar(lista,time,num){
    for(let k=0;k<lista.length;k++){
        if(lista[k].time==time){
            return parseFloat(lista[k][`c${num}`])
        }
    }
}
function buildPassado(camp,num){
    const {partidasTotais,listaTimes}=buildContext(camp,[])
    return {
        qtdRodadas:16,
        partidasTotais:partidasTotais.filter(part=>part.rodada<num),
        listaTimes
    }
}

function dif(valor1,valor2){
    if(valor1>valor2)return valor1-valor2
    return valor2-valor1
}

