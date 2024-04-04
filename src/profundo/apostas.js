import { buildContext, ligas } from "../bancos.js"
import { confEsc } from "../conferencias/confEsc.js"
import { confGols } from "../conferencias/confGols.js"
import { confPlacar } from "../conferencias/confPlacar.js"
import { confPrimGol } from "../conferencias/confPrimGol.js"
import { confUltimoGol } from "../conferencias/confUltimoGol.js"
import { getPartida } from "../especiais/getPartida.js"

export function buscarApostasJogo(camp,mandante,visitante){
    const {partidasTotais}=buildContext(camp,true)
    const partida=getPartida(partidasTotais,mandante+visitante)
    const jogoAntigo=partida[1].length==2
    const odr=partida.length==3?jogoAntigo?false:partida[2]:partida[4]
    if(!odr)return []
    const apostas=[]

    for(let caso of odr){
        const lis=caso.split('-')
        const info=lis[0]
        const num=lis[1]
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        const texto=darNomeAposta(camp,mandante,visitante,grandeza,c,asc,metade)
        let odd
        if(grandeza==1){
            odd=(num/100).toFixed(2)
            const green=jogoAntigo?confPlacar(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,null):undefined
            apostas.push({info,texto,odd,green})
        }else{
            odd=[]
            const zerado=num.length%3==0
            const unidade=num.length%3==1
            let qtd=zerado?0:unidade?parseInt(num[0]):parseInt(`${num[0]}${num[1]}`)
            for(let k=(zerado?0:unidade?1:2);k<num.length;k+=3){
                const o=(`${num[k]}${num[k+1]}${num[k+2]}`/100).toFixed(2)
                const green=jogoAntigo?(
                    grandeza==2?confGols(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,qtd):
                    grandeza==6?confEsc(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,qtd):
                    grandeza==7?confPrimGol(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,qtd):
                    confUltimoGol(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,qtd)
                    ):undefined
                odd.push({green,q:qtd,o,t:`${asc?'Menos de ':'Mais de '}${qtd}`})
                qtd++
            }
            apostas.push({info,texto,odd})
        }
    }
    return apostas
}
function darNomeAposta(camp,mand,visi,grandeza,c,asc,metade){
    const {paths,contexts}=ligas
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    if(grandeza==1){
        if(!asc){
            if(c==1){
                texto=`${mandante} vencer`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${visitante} vencer`
        }}else{if(metade!=0)return null
                if(c==1){
                    texto=`${visitante} vencer ou empatar`
                }else if(c==2){
                    texto=`${mandante} ou ${visitante} vencer`
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
    }else if(grandeza==2){//==============================================================
        if(c==1){
            if(asc){
                texto=`Menos de X gols para ${mandante}`
            }else{
                texto=`Mais de X gols para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de X gols`
            }else{
                texto=`Mais de X gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de X gols para ${visitante}`
            }else{
                texto=`Mais de X gols para ${visitante}`
            }
        }
        if(metade==0)texto+=` na partida`
        if(metade==1)texto+=` no 1º tempo`
        if(metade==2)texto+=` no 2º tempo`
        return texto
    }else if(grandeza==6){
        if(c==1){
            if(asc){
                texto=`Menos de X escanteios para ${mandante}`
            }else{
                texto=`Mais de X escanteios para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de X escanteios`
            }else{
                texto=`Mais de X escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de X escanteios para ${visitante}`
            }else{
                texto=`Mais de X escanteios para ${visitante}`
            }
        }
        return texto
    }else if(grandeza==7){
        if(c==1 && !asc){
            texto=`${mandante} marca o primeiro gol`
        }else if(c==3 &&!asc){
            texto=`${visitante} marca o primeiro gol`
        }
        return texto
    }else if(grandeza==8){
        if(c==1 && !asc){
            texto=`${mandante} marca o último gol`
        }else if(c==3 &&!asc){
            texto=`${visitante} marca o último gol`
        }
        return texto
    }
    return null
}


 