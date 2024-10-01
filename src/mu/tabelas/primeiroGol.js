import filtrar from "../../especiais/filtrarPartidas.js"

export  function primeiroGol(context,estadia){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        const partidas=filtrar(partidasTotais,time,estadia)
        let totalPrimMeu=0
        let totalPrimDeles=0
        let totalPrim=0
        let c1=0;let c2=0;let c3=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const gols=partida[2]
            let primeiroMeu=null
            let primeiroDeles=null
            for(let gol of gols){
                const minuto=gol>0?gol:-gol
                if(mandante==time?gol>0:gol<0){
                    if(!primeiroMeu)primeiroMeu=minuto
                }else{
                    if(!primeiroDeles)primeiroDeles=minuto
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
            c1:c1==0?'-':parseFloat((totalPrimMeu/c1).toFixed(0)),
            c2:c2==0?'-':parseFloat((totalPrim/c2).toFixed(0)),
            c3:c3==0?'-':parseFloat((totalPrimDeles/c3).toFixed(0)),
        })
    }
    return resp
}
    