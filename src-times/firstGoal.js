import { getPartidasTime } from "../utils.js"

export async function firstGoal(ignorados,rodadas,time,who){
    const partidas=await getPartidasTime(time)
    let ganhou=0
    let empatou=0
    let perdeu=0
    
    const listFez=[]
    const listTomou=[]
    const listNada=[]
    let counter=rodadas
    for(let partida of partidas){
        if(counter===0)break;
        const {mandante,visitante,rodada,gols}=partida
        if(ignorados.includes(mandante==time?visitante:mandante))continue
        let nosso=0
        let deles=0
        for (let gol of gols){
            if(partida.mandante==time?gol.mandante:!gol.mandante){
                nosso++
            }else{deles++}
        }
        
        if(gols.length==0)continue
        if(who?partida.mandante==time?gols[0].mandante:!gols[0].mandante:partida.mandante==time?!gols[0].mandante:gols[0].mandante){
            const situation={partida:partida.id,adversario:(mandante==time?visitante:mandante),emCasa:(mandante==time?true:false),rodada}
            if(!gols[1]){
                listNada.push({...situation,apos:90-gols[0].minuto})
            }else if(partida.mandante==time?!gols[1].mandante:gols[1].mandante){
                listTomou.push({...situation,apos:gols[1].minuto-gols[0].minuto})
            }else{
                listFez.push({...situation,apos:gols[1].minuto-gols[0].minuto})
            }
            if(nosso>deles){ganhou++}else if(nosso<deles){perdeu++}else{empatou++}
        }
        counter--
    }
    const total=(ganhou+empatou+perdeu)/100
    const resp={
        resultados:{
            ganhou:{total:ganhou,perc:(ganhou?ganhou/total:0)},
            empatou:{total:empatou,perc:(empatou?empatou/total:0)},
            perdeu:{total:perdeu,perc:(perdeu?perdeu/total:0)}
        },fez:listFez,
        nada:listNada,
        tomou:listTomou
    }
    return resp
}