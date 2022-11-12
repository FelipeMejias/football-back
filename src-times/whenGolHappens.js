
export function whenGolHappens(partidas,ignorados,rodadas,time,who){
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
        let participaDaContagem=false
        for(let k=0;k<gols.length;k++){
            if(who?timeEhMandante?gols[k].mandante:!gols[k].mandante:partida.mandante==time?!gols[k].mandante:gols[k].mandante){
                participaDaContagem=true
                const situation={torneio,partida:partida.id,adversario:(mandante==time?visitante:mandante),emCasa:(mandante==time?true:false),rodada}
                if(!gols[k+1]){
                    listNada.push({...situation,apos:90-gols[k].minuto})
                }else if(timeEhMandante?!gols[k+1].mandante:gols[k+1].mandante){
                    listTomou.push({...situation,apos:gols[k+1].minuto-gols[k].minuto})
                }else{
                    listFez.push({...situation,apos:gols[k+1].minuto-gols[k].minuto})
                }
            }
        }
        if(participaDaContagem){
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