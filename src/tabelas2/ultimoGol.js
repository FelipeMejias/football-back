
export  function ultimoGol(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>(!estadia?(part.mandante==time||part.visitante==time):(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let totalUltMeu=0;
        let totalUltDeles=0;
        let totalUlt=0;
        let c1=0;let c2=0;let c3=0;
        for(let partida of partidas){
            const {mandante,visitante,gols:golsUnfiltred}=partida
            let ultimoMeu=null;
            let ultimoDeles=null
            const gols=golsUnfiltred?golsUnfiltred?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(mandante==time?gol.mandante:!gol.mandante){
                    ultimoMeu=gol.minuto
                }else{
                    ultimoDeles=gol.minuto
                }
            }
            if(ultimoMeu){
                totalUltMeu+=ultimoMeu
                c1++
                if(!ultimoDeles){
                    totalUlt+=ultimoMeu
                    c2++
                }
            }
            if(ultimoDeles){
                totalUltDeles+=ultimoDeles
                c3++
                if(!ultimoMeu){
                    totalUlt+=ultimoDeles
                    c2++
                }
            }
            if(ultimoDeles && ultimoMeu){
                totalUlt+=(ultimoDeles>ultimoMeu?ultimoDeles:ultimoMeu)
                c2++
            }
            if(!ultimoDeles && !ultimoMeu){
            }
        }  
        
        resp.push({time,
            c1:c1==0?'-':parseFloat((totalUltMeu/c1).toFixed(1)),
            c2:c2==0?'-':parseFloat((totalUlt/c2).toFixed(1)),
            c3:c3==0?'-':parseFloat((totalUltDeles/c3).toFixed(1)),
        })
    }
    return resp
}
    