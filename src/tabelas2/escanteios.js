export  function escanteios(context,estadia){
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
            const escant=partida.escant
            if(partida.mandante==time){
                golsPro+=escant[0]
                golsTotal+=escant[0]
                golsTotal+=escant[1]
                golsContra+=escant[1]
            }else{
                golsPro+=escant[1]
                golsTotal+=escant[0]
                golsTotal+=escant[1]
                golsContra+=escant[0]
            }
            cont++
        }
     
        resp.push({time,
            c1:cont==0?'-':parseFloat((golsPro/cont).toFixed(1)),
            c2:cont==0?'-':parseFloat((golsTotal/cont).toFixed(1)),
            c3:cont==0?'-':parseFloat((golsContra/cont).toFixed(1))
        })
    }
    console.log(resp)
    return resp
}