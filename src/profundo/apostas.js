import { buildContext, ligas } from "../bancos.js"
import { confEsc } from "../mu/conferencias/confEsc.js"
import { confGols } from "../mu/conferencias/confGols.js"
import { confPlacar } from "../mu/conferencias/confPlacar.js"
import { confPrimGol } from "../mu/conferencias/confPrimGol.js"
import { confUltimoGol } from "../mu/conferencias/confUltimoGol.js"
import { listaEsc } from "../mu/conferencias/listaEsc.js"
import { listaGols } from "../mu/conferencias/listaGols.js"
import { getPartida } from "../especiais/getPartida.js"
import { listaAnalise } from "../especiais/listaAnalise.js"

export function buscarApostasJogo(camp,mandante,visitante){
    const {partidasTotais}=buildContext(camp,true)
    const partida=getPartida(partidasTotais,mandante+visitante)
    const jogoAntigo=partida[1].length==2
    const odr=partida.length==3?jogoAntigo?false:partida[2]:partida[4]
    if(!odr)return []
    const apostas=[]
    //const apostasAdicionais=[]
    for(let caso of odr){
        if(!caso)console.log(mandante,visitante)
        const lis=caso.split('-')
        const info=lis[0]
        const num=lis[1]
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        const texto=darNomeAposta(camp,mandante,visitante,grandeza,c,asc,metade)
        let odd
        
        if(grandeza==1||grandeza==7||grandeza==8){
            odd=(num/100).toFixed(2)
            const green=jogoAntigo?(
            grandeza==1?
            confPlacar(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,null):
            grandeza==7?confPrimGol(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,null):
                    confUltimoGol(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,null)
            ):undefined
            apostas.push({info,texto,odd,green})
        }else{
            odd=[]
            const zerado=num.length%3==0
            const unidade=num.length%3==1
            let qtd=zerado?0:unidade?parseInt(num[0]):parseInt(`${num[0]}${num[1]}`)
            for(let k=(zerado?0:unidade?1:2);k<num.length;k+=3){
                /*if(grandeza==6&&c!=2&&!asc){
                    let ultimaOdd
                    let newQtd
                    let bloq=false
                    let qtdReal
                    if(jogoAntigo)qtdReal=listaEsc({partidasTotais:[partida]},0,metade,(c==3?visitante:mandante),1,parseInt(asc),parseFloat(5))[0].numero
                    if(asc){
                        newQtd=qtd-1
                        if(newQtd==0||newQtd==-1)bloq=true
                        ultimaOdd=parseFloat((`${num[(zerado?0:unidade?1:2)]}${num[(zerado?0:unidade?1:2)+1]}${num[(zerado?0:unidade?1:2)+2]}`/100).toFixed(2))

                    }else{
                        
                        const sobrantes=num.length-(zerado?0:unidade?1:2)
                        const pulantes=sobrantes/3
                        newQtd=qtd+pulantes
                        ultimaOdd=parseFloat((`${num[num.length-3]}${num[num.length-2]}${num[num.length-1]}`/100).toFixed(2))
                    }
                    
                    const certo=jogoAntigo?confEsc(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,newQtd):undefined
                    let qwert=true
                    for(let um of apostasAdicionais){
                        if(um.info==info)qwert=false
                    }

                    if(qwert&&!bloq){
                        apostasAdicionais.push({
                            info,valor:newQtd,certo,ultimaOdd,qtdReal
                        })
                        if(newQtd==9&&qtdReal==6&&ultimaOdd==3.75)console.log(mandante,visitante,c)
                    }
                    
                }*/
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
            apostas.push({info,texto,odd,})
        }
    }
    return /*{*/apostas/*,apostasAdicionais}*/
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


 