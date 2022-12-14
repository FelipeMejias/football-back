export  function totalComparacao(context,handicap){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        let fez=0
        let nada=0
        let tomou=0
        let tempofez=0
        let temponada=0
        let tempotomou=0
        const partidas=partidasTotais.filter(part=>(part.mandante==time||part.visitante==time))
        for(let partida of partidas){
            const {mandante,visitante,rodada,gols,torneio}=partida
            const timeEhMandante=mandante==time
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
        }
        const cont=fez+nada+tomou
        const v=fez*100/cont
        const e=nada*100/cont
        const d=tomou*100/cont
        let vit=cont==0?0:parseFloat(v.toFixed(2))
        let emp=cont==0?0:parseFloat(e.toFixed(2))
        let der=cont==0?0:parseFloat(d.toFixed(2))
        resp.push({time,
            c1:vit,
            c2:emp,
            c3:der,
            c4:fez==0?'-':parseFloat((tempofez/fez).toFixed(2)),
            c5:nada==0?'-':parseFloat((temponada/nada).toFixed(2)),
            c6:tomou==0?'-':parseFloat((tempotomou/tomou).toFixed(2))
        })
    }
    return resp
}