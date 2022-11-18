import { buildTimeResponse } from "../utils.js"

export  function firstGoal(partidas,ignorados,rodadas,time,who){
    let ganhou=0
    let empatou=0
    let perdeu=0
    
    const listFez=[]
    const listTomou=[]
    const listNada=[]
    let counter=rodadas
    for(let partida of partidas){
        if(counter===0)break;
        const {mandante,visitante,rodada,gols,torneio}=partida
        const timeEhMandante=mandante==time
        if(ignorados.includes(timeEhMandante?visitante:mandante))continue
        let nosso=0
        let deles=0
        for (let gol of gols){
            if(timeEhMandante?gol.mandante:!gol.mandante){
                nosso++
            }else{deles++}
        }
        
        if(gols.length==0)continue
        if(who?timeEhMandante?gols[0].mandante:!gols[0].mandante:timeEhMandante?!gols[0].mandante:gols[0].mandante){
            const situation={torneio,partida:partida.id,adversario:(timeEhMandante?visitante:mandante),emCasa:(timeEhMandante?true:false),rodada}
            if(!gols[1]){
                listNada.push({...situation,apos:90-gols[0].minuto})
            }else if(timeEhMandante?!gols[1].mandante:gols[1].mandante){
                listTomou.push({...situation,apos:gols[1].minuto-gols[0].minuto})
            }else{
                listFez.push({...situation,apos:gols[1].minuto-gols[0].minuto})
            }
            if(nosso>deles){ganhou++}else if(nosso<deles){perdeu++}else{empatou++}
        }
        counter--
    }
    return buildTimeResponse(ganhou,empatou,perdeu,listFez,listNada,listTomou)
}