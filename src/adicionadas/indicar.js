/*
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
    ['','240612'],
*/
const campeonato=''
const phase=2

const bloquearEscanteios=false
const bloquearEscanteiosAmbos=false
const bloquearPlacarGols=false
const bloquearPrimUltimoGol=false
import { tetoPosicao } from "../../index.js"
import { buildContext, ligas } from "../bancos.js"
import { buildFutura } from "../especiais/buildFutura.js"
import { getPartida } from "../especiais/getPartida.js"
import { acharPar } from "../profundo/dupla.js"
import { criarOrdem } from "../profundo/individual.js"

export function indicar(){
    const futuras=buildFutura().filter(jogo=>!jogo.placar)
    for(let partida of futuras){
        const {camp,mandante,visitante}=partida
        if(camp==`${campeonato}1`){
            const context=buildContext(camp)
            criarOrdemDuplaAposta(context,camp,mandante,visitante,phase)
        }
    }
}
export function criarOrdemDuplaAposta(context,camp,mandante,visitante,phase){
    const tetoReal=tetoPosicao+(camp=='arg1'?1:0)
    let y='['
    console.log(`==== ${mandante.toUpperCase()} x ${visitante.toUpperCase()} ====`)
    const ordemMandante=criarOrdem(context,mandante,true)
    const ordemVisitante=criarOrdem(context,visitante,true)
    const listaApo=[]
    const listao=[]
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap,pos}=est
        if(pos<=tetoReal){
            const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
            if(par){
                if(par.pos<=tetoReal){
                    
                    const aposta=acharAposta(mandante,visitante,camp,est)
                    
                    let ssss=true
                    /* QUANDO FUI ADICIONAR APOSTAS COM TETO MAIOR
                    const apostasAntigas=buscarApostasJogo(camp,mandante,visitante)
                    for(let nova of apostasAntigas){
                        const {info}=nova
                        if(info[0]==grandeza&&info[1]==c&&info[2]==asc&&info[3]==metade)ssss=false
                    }*/

                    if(aposta&&ssss){
                        
                        let naoTa=true
                        let index=0
                        listaApo.forEach((apo,ind)=>{
                            if(apo.texto==aposta){
                                naoTa=false
                            }
                            index++
                        })
                        if(naoTa){
                            let odd=0
                            let odr=1
                            if(phase==2){
                                const {partidasTotais}=buildContext(camp,true)
                                const partola=getPartida(partidasTotais,mandante+visitante)
                                const odds=partola[2]
                                odr=odds[index]
                            }
                            if(phase==1)console.log(aposta)
                            listaApo.push({texto:aposta,odd})
                            
                            if(odr){
                                if(phase==2&&odr)y+=`'${grandeza}${c}${asc}${metade?metade:0}-${odr}',`
                                listao.push({texto:aposta,odr})
                            }
                        }
                    }
                }
            }
        }
    })
    y+=']'
    
    if(phase==2){
        console.log(y)
    }
    console.log('===========================')
    return listao
}

export function acharAposta(mand,visi,camp,stat){
    const {contexts,paths}=ligas
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    const {grandeza,c,asc,metade}=stat
    if(grandeza==1){if(bloquearPlacarGols)return null
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
    }else if(grandeza==2){if(bloquearPlacarGols)return null
        if(c==1){
            if(asc){
                texto=`Menos gols para ${mandante}`
            }else{
                texto=`Mais gols para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos gols`
            }else{
                texto=`Mais gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos gols para ${visitante}`
            }else{
                texto=`Mais gols para ${visitante}`
            }
        }
        if(metade==0)texto+=` na partida`
        if(metade==1)texto+=` no 1º tempo`
        if(metade==2)texto+=` no 2º tempo`
        return texto
    }else if(grandeza==6){if(bloquearEscanteios)return null
        if(c==1){
            if(asc){
                texto=`Menos escanteios para ${mandante}`
            }else{
                texto=`Mais escanteios para ${mandante}`
            }
        }else if(c==2){if(bloquearEscanteiosAmbos)return null
            if(asc){
                texto=`Menos escanteios`
            }else{
                texto=`Mais escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos escanteios para ${visitante}`
            }else{
                texto=`Mais escanteios para ${visitante}`
            }
        }
        return texto
    }else if(grandeza==7){if(bloquearPrimUltimoGol)return null
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
    }else if(grandeza==8){if(bloquearPrimUltimoGol)return null
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
