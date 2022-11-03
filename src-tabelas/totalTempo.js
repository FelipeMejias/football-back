const listaTimes=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
import { getPartidas } from "../utils.js"
export async function totalTempo(ignorados,rodadas,estadia,metade){
    const partidasTotais=await getPartidas()
    const resp=[]
    for(let time of listaTimes){
        const partidasUnfiltred=partidasTotais.filter(part=>(part.mandante===time||part.visitante===time))
        const partidas=partidasUnfiltred.filter(part=>(!estadia?true:(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let totalPrimMeu=0;let totalUltMeu=0;
        let totalPrimDeles=0;let totalUltDeles=0;
        let totalPrim=0; let totalUlt=0;
        let c1=0;let c2=0;let c3=0;let c4=0;let c5=0;let c6=0;
        let counter=rodadas
        for(let partida of partidas){
            if(counter===0)break;
            const {mandante,visitante,gols:golsUnfiltred}=partida
            if(ignorados.includes(mandante==time?visitante:mandante))continue
            let primeiroMeu=null
            let primeiroDeles=null
            let ultimoMeu=null;
            let ultimoDeles=null
            const gols=golsUnfiltred?golsUnfiltred?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    if(!primeiroMeu)primeiroMeu=gol.minuto
                    ultimoMeu=gol.minuto
                }else{
                    if(!primeiroDeles)primeiroDeles=gol.minuto
                    ultimoDeles=gol.minuto
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
            
            if(ultimoMeu){
                totalUltMeu+=ultimoMeu
                c4++
                if(!ultimoDeles){
                    totalUlt+=ultimoMeu
                    c5++
                }
            }
            if(ultimoDeles){
                totalUltDeles+=ultimoDeles
                c6++
                if(!ultimoMeu){
                    totalUlt+=ultimoDeles
                    c5++
                }
            }
            if(ultimoDeles && ultimoMeu){
                totalUlt+=(ultimoDeles>ultimoMeu?ultimoDeles:ultimoMeu)
                c5++
            }
            if(!ultimoDeles && !ultimoMeu){
            }
            counter--
        }  
        
        resp.push({time,
            c1:c1==0?'-':(totalPrimMeu/c1).toFixed(1),
            c2:c2==0?'-':(totalPrim/c2).toFixed(1),
            c3:c3==0?'-':(totalPrimDeles/c3).toFixed(1),
            c4:c4==0?'-':(totalUltMeu/c4).toFixed(1),
            c5:c5==0?'-':(totalUlt/c5).toFixed(1),
            c6:c6==0?'-':(totalUltDeles/c6).toFixed(1),
        })
    }
    return resp
}
    
