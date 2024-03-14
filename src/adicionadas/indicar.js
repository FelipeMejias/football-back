/*
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
    ['','2403'],
*/
const campeonato=''
const phase=1

//sem escanteios=> italia, alemanha, frança
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
    if(grandeza==1){
        if(!asc){
            if(c==1){
                texto=`${mandante} vencer`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${visitante} vencer`
            }
        }else{return null}
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
    }else if(grandeza==6){
        if(c==1){
            if(asc){
                texto=`Menos escanteios para ${mandante}`
            }else{
                texto=`Mais escanteios para ${mandante}`
            }
        }else if(c==2){
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
    }
    return null
}
