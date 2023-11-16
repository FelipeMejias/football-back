export  function confPlacar(context,estadia,metade,time,c,asc,valor){
    const {partidasTotais}=context
    const partidas=partidasTotais.filter(part=>{
        const nome=part[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        return(!estadia?(mandante==time||visitante==time):(
        estadia==1?mandante==time:visitante==time
    ))})
    let contCertos=0
    let cont=0
    for(let partida of partidas){
        let h=0
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
                h++
            }else{
                h--
            }
        }
        if(c==1){
            if(asc){
                if(h<=0)contCertos++
            }else{
                if(h>0)contCertos++
            }
        }else if(c==2){
            if(asc){
                if(h!=0)contCertos++
            }else{
                if(h==0)contCertos++
            }
        }else if(c==3){
            if(asc){
                if(h>=0)contCertos++
            }else{
                if(h<0)contCertos++
            }
        }
        cont++
    }
    return parseInt((contCertos*100/cont).toFixed(0))
}