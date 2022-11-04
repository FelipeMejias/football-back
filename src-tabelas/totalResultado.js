import { getPartidas } from "../utils.js"
const listaTimes=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
export  function totalResultado(ignorados,rodadas,estadia,metade){
    const partidasTotais= getPartidas()
    const resp=[]
    let cont
    for(let time of listaTimes){
        let remain=rodadas
        const partidasUnfiltred=partidasTotais.filter(part=>((part.mandante===time && !ignorados.includes(part.visitante))||(part.visitante===time && !ignorados.includes(part.mandante))))
        const partidas=partidasUnfiltred.filter(part=>(!estadia?true:(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let vitorias=0;let golsPro=0;
        let empates=0;let golsTotal=0;
        let derrotas=0;let golsContra=0;
        cont=0
        for(let partida of partidas){
            if(remain===0)break;
            let nosso=0
            let deles=0
            const gols=partida.gols?partida.gols?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    nosso++;golsPro++;golsTotal++
                }else{
                    deles++;golsContra++;golsTotal++
                }
            }
            if(nosso>deles){vitorias++}else if(nosso<deles){derrotas++}else{empates++}
            remain--
            cont++
        }
        resp.push({time,
            c1:cont==0?'-':Math.round(vitorias*100/cont),
            c2:cont==0?'-':Math.round(empates*100/cont),
            c3:cont==0?'-':Math.round(derrotas*100/cont),
            c4:cont==0?'-':(golsPro/cont).toFixed(2),
            c5:cont==0?'-':(golsTotal/cont).toFixed(2),
            c6:cont==0?'-':(golsContra/cont).toFixed(2)
        })
    }
    return resp
}
