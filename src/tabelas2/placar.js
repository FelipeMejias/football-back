export  function placar(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>(!estadia?(part.mandante==time||part.visitante==time):(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let vitorias=0
        let empates=0
        let derrotas=0
        cont=0
        for(let partida of partidas){
            let nosso=0
            let deles=0
            const gols=partida.gols?partida.gols?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    nosso++
                }else{
                    deles++
                }
            }
            if(nosso>deles){vitorias++}else if(nosso<deles){derrotas++}else{empates++}
            cont++
        }
        const v=vitorias*100/cont
        const e=empates*100/cont
        const d=derrotas*100/cont
        let vit=cont==0?0:parseFloat(v.toFixed(0))
        let emp=cont==0?0:parseFloat(e.toFixed(0))
        let der=cont==0?0:parseFloat(d.toFixed(0))
        resp.push({time,
            c1:vit,
            c2:emp,
            c3:der,
        })
    }
    return resp
}