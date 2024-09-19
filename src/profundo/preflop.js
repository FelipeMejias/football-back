import { ligas } from "../bancos.js"
import { criarOrdemDupla } from "./dupla.js"
import { criarOrdemDuplaPreflop } from "./duplaPreFlop.js"

export function preFlop(camp,mandante,visitante){
    const resp=criarOrdemDuplaPreflop(camp,mandante,visitante)
    const resposta=[]
    let cont=0
    const {paths,posMinima}=ligas
    const pm=posMinima[paths.indexOf(camp)]
    while(resp[cont]&&resposta.length<10&&(resp[cont][0].pos+resp[cont][1].pos<=13)){
        let frase=nomePreFlop(mandante,visitante,camp,resp[cont][0])
        let pode=true
        for(let item of resposta){
            if(item.frase==frase)pode=false
        }
        if(!pode){
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
    return resposta.sort((a,b)=>{if(a.analise.grandeza<b.analise.grandeza){return -1}else{return true}})
}
function nomePreFlop(mand,visi,camp,stat){
    const {contexts,paths}=ligas
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    const {grandeza,c,asc,metade}=stat
    if(grandeza==1){
        if(!asc){
            if(c==1){
                texto=`${mandante} vencer`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${visitante} vencer`
            }
        }else{
            if(metade!=0)return null
            if(c==1){
                texto=`${visitante} vencer ou empatar`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${mandante} vencer ou empatar`
            }  
        }
        if(metade==0)texto+=` a partida`
        if(metade==1){
            texto+=` o 1º tempo`
        }
        if(metade==2){
            texto+=` o 2º tempo`
        }
        return texto
    }else if(grandeza==2){
        if(c==1){
            if(asc){
                texto=`Poucos gols para ${mandante}`
            }else{
                texto=`Muitos gols para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Poucos gols`
            }else{
                texto=`Muitos gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Poucos gols para ${visitante}`
            }else{
                texto=`Muitos gols para ${visitante}`
            }
        }
        if(metade==0)texto+=` na partida`
        if(metade==1)texto+=` no 1º tempo`
        if(metade==2)texto+=` no 2º tempo`
        return texto
    }else if(grandeza==6){
        if(c==1){
            if(asc){
                texto=`Poucos escanteios para ${mandante}`
            }else{
                texto=`Muitos escanteios para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Poucos escanteios`
            }else{
                texto=`Muitos escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Poucos escanteios para ${visitante}`
            }else{
                texto=`Muitos escanteios para ${visitante}`
            }
        }
        return texto
    }else if(grandeza==7){
        if(c==1){
            if(asc){
                return null
            }else{
                texto=`${mandante} marca primeiro`
            }
        }else if(c==3){
            if(asc){
                return null
            }else{
                texto=`${visitante} marca primeiro`
            }
        }
        return texto
    }else if(grandeza==8){
        if(c==1){
            if(asc){
                return null
            }else{
                texto=`${mandante} marca por último`
            }
        }else if(c==3){
            if(asc){
                return null
            }else{
                texto=`${visitante} marca por último`
            }
        }
        return texto
    }
    return null
}