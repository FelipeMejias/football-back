
export  function ultimoGol(context,estadia){
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
            const {mandante,visitante,gols}=partida
            let ultimoMeu=null;
            let ultimoDeles=null
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
            c1:c1==0?'-':parseFloat((totalUltMeu/c1).toFixed(0)),
            c2:c2==0?'-':parseFloat((totalUlt/c2).toFixed(0)),
            c3:c3==0?'-':parseFloat((totalUltDeles/c3).toFixed(0)),
        })
    }
    return resp
}
    