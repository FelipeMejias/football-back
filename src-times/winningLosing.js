import { getPartidasTime } from "../utils.js"
let x=1
export async function winningLosing(ignorados,rodadas,time,who,tieing=false){

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
        if(gols.length==0 && !tieing)continue
        let participaDaContagem=false
        for(let k=0;k<=gols.length;k++){
            if(tieing?nosso==deles:(who?nosso>deles:nosso<deles)){
                participaDaContagem=true
                const situation={partida:partida.id,adversario:(mandante==time?visitante:mandante),emCasa:(mandante==time?true:false),rodada}
                if(!gols[k]){
                    listNada.push({...situation,apos:(gols[k-1]?90-gols[k-1].minuto:90)})
                }else if(partida.mandante==time?!gols[k].mandante:gols[k].mandante){
                    listTomou.push({...situation,apos:gols[k].minuto-(gols[k-1]?gols[k-1].minuto:0)})
                }else{
                    listFez.push({...situation,apos:gols[k].minuto-(gols[k-1]?gols[k-1].minuto:0)})
                }
            }
            if(gols[k]){
                if(partida.mandante==time?gols[k].mandante:!gols[k].mandante){
                    nosso++
                }else{deles++}
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