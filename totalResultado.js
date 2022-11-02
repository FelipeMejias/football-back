import { getTabelaData } from "./utils.js"
const listaTimes=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
export async function totalResultado(ignorados,rodadas,estadia,metade){
    const {partidasTotais,golList}=await getTabelaData()
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
            const golsUnfiltred=golList.filter(gol=>(gol.partidaId==partida.id))
            const gols=golsUnfiltred.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            )))
            for(let gol of gols){
                if(gol.marcador==time){
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
            c1:Math.round(vitorias*100/cont),
            c2:Math.round(empates*100/cont),
            c3:Math.round(derrotas*100/cont),
            c4:(golsPro/cont).toFixed(2),
            c5:(golsTotal/cont).toFixed(2),
            c6:(golsContra/cont).toFixed(2)
        })
    }
    return resp
}
