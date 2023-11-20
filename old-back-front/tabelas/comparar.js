export  function comparar(context,handicap){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        let fez=0
        let nada=0
        let tomou=0
        const partidas=partidasTotais.filter(part=>{
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            return (mandante==time||visitante==time)})
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const timeEhMandante=mandante==time
            const gols=partida[2]
            let nosso=0
            let deles=0
            let participaDaContagem=false
            for(let k=0;k<=gols.length;k++){
                let situ=nosso-deles
                if(situ>1){
                    situ=1
                }else if(situ<-1){
                    situ=-1
                }
                if(situ==handicap){
                    participaDaContagem=true
                    if(!gols[k]){
                        nada++;
                    }else if(timeEhMandante?gols[k]<0:gols[k]>0){
                        tomou++;
                    }else{
                        fez++;
                    }
                }
                if(gols[k]){
                    if(timeEhMandante?gols[k]<0:gols[k]>0){
                        deles++
                    }else{nosso++}
                }
            }
        }
        const cont=fez+nada+tomou
        const v=fez*100/cont
        const e=nada*100/cont
        const d=tomou*100/cont
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