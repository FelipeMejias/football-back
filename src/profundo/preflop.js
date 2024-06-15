import { ligas } from "../bancos.js"
import { nomePreFlop } from "../especiais/preflop.js"
import { criarOrdemDupla } from "./dupla.js"

export function preFlop(camp,mandante,visitante){
    const resp=criarOrdemDupla(camp,mandante,visitante)
    const resposta=[]
    let cont=0
    const {paths,posMinima}=ligas
    const pm=posMinima[paths.indexOf(camp)]
    while(resposta.length<4&&(resposta.length<2||(resp[cont][0].pos+resp[cont][1].pos<=pm))){
        const frase=nomePreFlop(mandante,visitante,camp,resp[cont][0])
        let pode=true
        for(let item of resposta){
            if(item.frase==frase)pode=false
        }
        if(!pode){
            cont++
            const stat=resp[cont]
            let num=null
            if(stat.length==3){
                const listaOdd=stat[2].odd
                if(typeof(listaOdd)=='array'){
                    if(stat[0].asc){
                        num=listaOdd[listaOdd.length-1].q
                    }else{
                        num=listaOdd[0].q
                    }
                }
            }
            const novaFrase=nomePreFlop(mandante,visitante,camp,stat[0])
            resposta.push({frase:novaFrase,num,analise:stat[0],comOdds:stat.length==3})
            cont++
        }else{
            const stat=resp[cont]
            let num=null
            if(stat.length==3){
                const listaOdd=stat[2].odd
                if(typeof(listaOdd)!='string'){

                    if(stat[0].asc){
                        num=listaOdd[listaOdd.length-1].q
                    }else{
                        num=listaOdd[0].q
                    }
                }
            }
            resposta.push({frase,num,analise:stat[0],comOdds:stat.length==3})
            cont++
        }
    }
    return resposta
}