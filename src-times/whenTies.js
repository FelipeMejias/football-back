import { getPartidasTime } from "../utils.js"

export  function whenTies(ignorados,rodadas,time,who){
    const partidas= getPartidasTime(time)
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
        const timeEhMandante=mandante==time
        if(ignorados.includes(timeEhMandante?visitante:mandante))continue
        let nosso=0
        let deles=0
        for (let gol of gols){
            if(timeEhMandante?gol.mandante:!gol.mandante){
                nosso++
            }else{deles++}
        }
        if(gols.length<2)continue
        if(gols[0].mandante==gols[1].mandante)continue
        if(who?timeEhMandante?gols[1].mandante:!gols[1].mandante:timeEhMandante?!gols[1].mandante:gols[1].mandante){
            const situation={partida:partida.id,adversario:(timeEhMandante?visitante:mandante),emCasa:(mandante==time?true:false),rodada}
            if(!gols[2]){
                listNada.push({...situation,apos:90-gols[1].minuto})
            }else if(timeEhMandante?!gols[1].mandante:gols[1].mandante){
                listTomou.push({...situation,apos:gols[2].minuto-gols[1].minuto})
            }else{
                listFez.push({...situation,apos:gols[2].minuto-gols[1].minuto})
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