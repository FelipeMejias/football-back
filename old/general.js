import { buildTimeResponse } from "../src/utils.js"

export  function general(partidas,ignorados,rodadas,time,handicap){
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
        let participaDaContagem=false
        for(let k=0;k<=gols.length;k++){
            let situ=nosso-deles
            if(situ>2){
                situ=2
            }else if(situ<-2){
                situ=-2
            }
            if(situ==handicap){
                participaDaContagem=true
                const situation={torneio,partida:partida.id,adversario:(timeEhMandante?visitante:mandante),emCasa:(timeEhMandante?true:false),rodada}
                if(!gols[k]){
                    listNada.push({...situation,apos:(gols[k-1]?90-gols[k-1].minuto:90)})
                }else if(timeEhMandante?!gols[k].mandante:gols[k].mandante){
                    listTomou.push({...situation,apos:gols[k].minuto-(gols[k-1]?gols[k-1].minuto:0)})
                }else{
                    listFez.push({...situation,apos:gols[k].minuto-(gols[k-1]?gols[k-1].minuto:0)})
                }
            }
            if(gols[k]){
                if(timeEhMandante?gols[k].mandante:!gols[k].mandante){
                    nosso++
                }else{deles++}
            }
            
        }
        if(participaDaContagem){
            if(nosso>deles){ganhou++}else if(nosso<deles){perdeu++}else{empatou++}
        }
        counter--
    }
    return buildTimeResponse(ganhou,empatou,perdeu,listFez,listNada,listTomou)
}