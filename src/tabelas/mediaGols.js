export  function mediaGols(context,estadia,metade){
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
        let golsPro=0;
        let golsTotal=0;
        let golsContra=0;
        cont=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const golos=partida[2]
            const gols=golos?golos?.filter(gol=>{
                const minuto=gol>0?gol:-gol
                return (!metade?true:(
                metade==1?(minuto<=45):(minuto>45)
            ))}):[]
            for(let gol of gols){
                if(mandante==time?gol>0:gol<0){
                    golsPro++;golsTotal++
                }else{
                    golsContra++;golsTotal++
                }
            }
            cont++
        }
     
        resp.push({time,
            c1:cont==0?'-':parseFloat((golsPro/cont).toFixed(2)),
            c2:cont==0?'-':parseFloat((golsTotal/cont).toFixed(2)),
            c3:cont==0?'-':parseFloat((golsContra/cont).toFixed(2))
        })
    }
    return resp
}