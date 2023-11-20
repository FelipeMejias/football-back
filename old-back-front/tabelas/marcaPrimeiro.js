export  function marcaPrimeiro(context,estadia){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>{
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            return(!estadia?(mandante==time||visitante==time):(
            estadia==1?mandante==time:visitante==time
        ))})
        let pro=0;
        let sem=0;
        let con=0;
        cont=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const gols=partida[2]
            if(gols.length>0){
                const gol=gols[0]
                if(mandante==time?gol>0:gol<0){
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