export  function marcaPrimeiro(context,estadia){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>(!estadia?(part.mandante==time||part.visitante==time):(
            estadia==1?part.mandante==time:part.visitante==time
        )))
        let pro=0;
        let sem=0;
        let con=0;
        cont=0
        for(let partida of partidas){
            const gols=partida.gols
            if(gols.length>0){
                const gol=gols[0]
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    pro++
                }else{con++}
            }else{
                sem++
            }
            cont++
        }
        const v=pro*100/cont
        const e=sem*100/cont
        const d=con*100/cont
        let vit=cont==0?0:parseFloat(v.toFixed(2))
        let emp=cont==0?0:parseFloat(e.toFixed(2))
        let der=cont==0?0:parseFloat(d.toFixed(2))
        resp.push({time,
            c1:vit,
            c2:emp,
            c3:der,
        })
    }
    return resp
}