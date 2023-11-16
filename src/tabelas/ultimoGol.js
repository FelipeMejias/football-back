
export  function ultimoGol(context,estadia){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>{
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            return(!estadia?(mandante==time||visitante==time):(
            estadia==1?mandante==time:visitante==time
        ))})
        let totalUltMeu=0;
        let totalUltDeles=0;
        let totalUlt=0;
        let c1=0;let c2=0;let c3=0;
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const gols=partida[2]
            let ultimoMeu=null;
            let ultimoDeles=null
            for(let gol of gols){
                const minuto=gol>0?gol:-gol
                if(mandante==time?gol>0:gol<0){
                    ultimoMeu=minuto
                }else{
                    ultimoDeles=minuto
                }
            }
            if(ultimoMeu){
                totalUltMeu+=ultimoMeu
                c1++
                if(!ultimoDeles){
                    totalUlt+=ultimoMeu
                    c2++
                }
            }
            if(ultimoDeles){
                totalUltDeles+=ultimoDeles
                c3++
                if(!ultimoMeu){
                    totalUlt+=ultimoDeles
                    c2++
                }
            }
            if(ultimoDeles && ultimoMeu){
                totalUlt+=(ultimoDeles>ultimoMeu?ultimoDeles:ultimoMeu)
                c2++
            }
            if(!ultimoDeles && !ultimoMeu){
            }
        }  
        
        resp.push({time,
            c1:c1==0?'-':parseFloat((totalUltMeu/c1).toFixed(0)),
            c2:c2==0?'-':parseFloat((totalUlt/c2).toFixed(0)),
            c3:c3==0?'-':parseFloat((totalUltDeles/c3).toFixed(0)),
        })
    }
    return resp
}
    