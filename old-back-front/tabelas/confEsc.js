export  function confEsc(context,estadia,metade,time,c,asc,valor){
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
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const escanteios=partida[1]
        let escBuscado
        if(c==1){
            escBuscado=mandante==time?escanteios[0]:escanteios[1]
        }if(c==2){
            escBuscado=escanteios[0]+escanteios[1]
        }if(c==3){
            escBuscado=mandante==time?escanteios[1]:escanteios[0]
        }
        if(asc?escBuscado<valor:escBuscado>valor)contCertos++
        cont++
    }
    return parseInt((contCertos*100/cont).toFixed(0))
}