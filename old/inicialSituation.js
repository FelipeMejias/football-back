import { buildTimeResponse } from "../src/utils.js"

export  function inicialSituation(partidas,ignorados,rodadas,time){
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
        
        const situation={torneio,partida:partida.id,adversario:(timeEhMandante?visitante:mandante),emCasa:(timeEhMandante?true:false),rodada}
        if(gols.length===0){
            listNada.push({...situation,apos:90})
        }else if(timeEhMandante?!gols[0].mandante:gols[0].mandante){
            listTomou.push({...situation,apos:gols[0].minuto})
        }else{
            listFez.push({...situation,apos:gols[0].minuto})
        }
        if(nosso>deles){ganhou++}else if(nosso<deles){perdeu++}else{empatou++}
        counter--
    }
    return buildTimeResponse(ganhou,empatou,perdeu,listFez,listNada,listTomou)
}