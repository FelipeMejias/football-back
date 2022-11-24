export  function totalResultado(context,ignorados,rodadas,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        let remain=rodadas
        const partidasUnfiltred=partidasTotais.filter(part=>((part.mandante===time && !ignorados.includes(part.visitante))||(part.visitante===time && !ignorados.includes(part.mandante))))
        const partidas=partidasUnfiltred.filter(part=>(!estadia?true:(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let vitorias=0;let golsPro=0;
        let empates=0;let golsTotal=0;
        let derrotas=0;let golsContra=0;
        cont=0
        for(let partida of partidas){
            if(remain===0)break;
            let nosso=0
            let deles=0
            const gols=partida.gols?partida.gols?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    nosso++;golsPro++;golsTotal++
                }else{
                    deles++;golsContra++;golsTotal++
                }
            }
            if(nosso>deles){vitorias++}else if(nosso<deles){derrotas++}else{empates++}
            remain--
            cont++
        }
        const v=vitorias*100/cont
        const e=empates*100/cont
        const d=derrotas*100/cont
        let vit=cont==0?0:Math.round(v)
        let emp=cont==0?0:Math.round(e)
        let der=cont==0?0:Math.round(d)
        if(vit+emp+der!=100 && vit+emp+der!=0 ){
            const faltante=100-(vit+emp+der)
            const rv=v%1
            const re=e%1
            const rd=d%1
            if(faltante==1){
                if(rv>=re && rv>=rd){
                    vit++
                }else if (rd>=rv && rd>=re){
                    der++
                }else{emp++}
            }else if(faltante==2){
                if(rv>=re && rd>=re){
                    vit++
                    emp++
                }else if (rd>=rv && re>=rv){
                    der++
                    emp++
                }else{der++;vit++}
            }else if(faltante==-2){
                if(rv>=re && rv>=rd){
                    emp--
                    der--
                }else if (rd>=rv && rd>=re){
                    emp--
                    vit--
                }else{vit--;der--}
            }else if(faltante==-1){
                if(rv>=re && rd>=re){
                    der--
                }else if (rd>=rv && re>=rv){
                    vit--
                }else{emp--}
            }
        }
        
        
        resp.push({time,
            c1:vit==0?'-':vit,
            c2:emp==0?'-':emp,
            c3:der==0?'-':der,
            c4:cont==0?'-':(golsPro/cont).toFixed(2),
            c5:cont==0?'-':(golsTotal/cont).toFixed(2),
            c6:cont==0?'-':(golsContra/cont).toFixed(2)
        })
    }
    return resp
}