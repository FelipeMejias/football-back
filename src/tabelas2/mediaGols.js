export  function mediaGols(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>(!estadia?(part.mandante==time||part.visitante==time):(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let golsPro=0;
        let golsTotal=0;
        let golsContra=0;
        cont=0
        for(let partida of partidas){
            const gols=partida.gols?partida.gols?.filter(gol=>(!metade?true:(
                metade==1?(gol.minuto<=45):(gol.minuto>45)
            ))):[]
            for(let gol of gols){
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    golsPro++;golsTotal++
                }else{
                    golsContra++;golsTotal++
                }
            }
            cont++
        }
     
        resp.push({time,
            c1:cont==0?'-':parseFloat((golsPro/cont).toFixed(3)),
            c2:cont==0?'-':parseFloat((golsTotal/cont).toFixed(3)),
            c3:cont==0?'-':parseFloat((golsContra/cont).toFixed(3))
        })
    }
    return resp
}