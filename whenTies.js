import { getFootballData } from "./utils.js"

export async function whenTies(ignorados,rodadas,time,who){
    const {golList,partidas}=await getFootballData(time)
    let ganhou=0
    let empatou=0
    let perdeu=0
    
    const listFez=[]
    const listTomou=[]
    const listNada=[]
    let counter=rodadas
    for(let partida of partidas){
        if(counter===0)break;
        const {mandante,visitante,rodada}=partida
        if(ignorados.includes(mandante==time?visitante:mandante))continue
        let nosso=0
        let deles=0
        const gols=golList.filter(gol=>{
            if(gol.partidaId==partida.id){
                if(gol.marcador==time){
                    nosso++
                }else{deles++}
                return true
            }return false
        })
        if(gols.length<2)continue
        if(gols[0].marcador==gols[1].marcador)continue
        if(who?gols[1].marcador==time:gols[1].sofredor==time){
            const situation={partida:partida.id,adversario:(mandante==time?visitante:mandante),emCasa:(mandante==time?true:false),rodada}
            if(!gols[2]){
                listNada.push({...situation,apos:90-gols[1].minuto})
            }else if(gols[2].sofredor==time){
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