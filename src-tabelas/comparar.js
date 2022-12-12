export  function totalComparacao(context,ignorados,rodadas,handicap){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        let remain=rodadas
        const partidas=partidasTotais.filter(part=>((part.mandante===time && !ignorados.includes(part.visitante))||(part.visitante===time && !ignorados.includes(part.mandante))))
        let fez=0
        let nada=0
        let tomou=0
        let tempofez=0
        let temponada=0
        let tempotomou=0
        for(let partida of partidas){
            if(remain===0)break;
            const {mandante,visitante,rodada,gols,torneio}=partida
            const timeEhMandante=mandante==time
            if(ignorados.includes(timeEhMandante?visitante:mandante))continue
            let nosso=0
            let deles=0
            let participaDaContagem=false
            for(let k=0;k<=gols.length;k++){
                let situ=nosso-deles
                if(situ>2){
                    situ=2
                }else if(situ<-2){
                    situ=-2
                }
                if(situ==handicap){
                    participaDaContagem=true
                    if(!gols[k]){
                        nada++;temponada+=(gols[k-1]?90-gols[k-1].minuto:90)
                    }else if(timeEhMandante?!gols[k].mandante:gols[k].mandante){
                        tomou++;tempotomou+=gols[k].minuto-(gols[k-1]?gols[k-1].minuto:0)
                    }else{
                        fez++;tempofez+=gols[k].minuto-(gols[k-1]?gols[k-1].minuto:0)
                    }
                }
                if(gols[k]){
                    if(timeEhMandante?gols[k].mandante:!gols[k].mandante){
                        nosso++
                    }else{deles++}
                }
                
            }
            remain--
        }
        const cont=fez+nada+tomou
        const v=fez*100/cont
        const e=nada*100/cont
        const d=tomou*100/cont
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
            c4:fez==0?'-':parseFloat((tempofez/fez).toFixed(1)),
            c5:nada==0?'-':parseFloat((temponada/nada).toFixed(1)),
            c6:tomou==0?'-':parseFloat((tempotomou/tomou).toFixed(1))
        })
    }
    return resp
}