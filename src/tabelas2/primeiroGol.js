
export  function primeiroGol(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>(!estadia?(part.mandante==time||part.visitante==time):(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let totalPrimMeu=0
        let totalPrimDeles=0
        let totalPrim=0
        let c1=0;let c2=0;let c3=0
        for(let partida of partidas){
            const {mandante,visitante,gols:golsUnfiltred}=partida
            let primeiroMeu=null
            let primeiroDeles=null
            const gols=golsUnfiltred?golsUnfiltred?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(mandante==time?gol.mandante:!gol.mandante){
                    if(!primeiroMeu)primeiroMeu=gol.minuto
                }else{
                    if(!primeiroDeles)primeiroDeles=gol.minuto
                }
            }
            if(primeiroMeu){
                totalPrimMeu+=primeiroMeu
                c1++
                if(!primeiroDeles){
                    totalPrim+=primeiroMeu
                    c2++
                }
            }
            if(primeiroDeles){
                totalPrimDeles+=primeiroDeles
                c3++
                if(!primeiroMeu){
                    totalPrim+=primeiroDeles
                    c2++
                }
            }
            if(primeiroDeles && primeiroMeu){
                totalPrim+=(primeiroDeles>primeiroMeu?primeiroMeu:primeiroDeles)
                c2++
            }
            
        }  
        
        resp.push({time,
            c1:c1==0?'-':parseFloat((totalPrimMeu/c1).toFixed(1)),
            c2:c2==0?'-':parseFloat((totalPrim/c2).toFixed(1)),
            c3:c3==0?'-':parseFloat((totalPrimDeles/c3).toFixed(1)),
        })
    }
    return resp
}
    