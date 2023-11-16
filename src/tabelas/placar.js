export  function placar(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>{
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            return (!estadia?(mandante==time||visitante==time):(
            estadia==1?mandante==time:visitante==time
        ))})
        let vitorias=0
        let empates=0
        let derrotas=0
        cont=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            let nosso=0
            let deles=0
            const golos=partida[2]
            const gols=golos?golos?.filter(gol=>{
                const minuto=(gol>0?gol:-gol)
                return (!metade?true:(
                metade==1?(minuto<=45):(minuto>45)
            ))}):[]
            for(let gol of gols){
                if(mandante==time?gol>0:gol<0){
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