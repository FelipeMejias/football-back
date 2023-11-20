export  function partidasTime(banco,time){
    const resp=[]
    for(let k=0;k<banco.length;k++){
        const rodada=banco.length-k
        for(let partida of banco[k]){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            if(!(partida[2]&&typeof(partida[2][0])!='number') && (mandante==time||visitante==time)){
                const gols=partida[2]
                let m=0
                let v=0
                if(gols){
                    for(let gol of gols){
                        if(gol>0){
                            m++
                        }else{
                            v++
                        }
                    }
                    resp.push({
                        rodada,
                        mandante,
                        visitante,
                        placar:[m,v],
                        sg:mandante==time?m-v:v-m
                    })
                }else{
                    resp.push({
                    rodada,
                    mandante,
                    visitante,
                    sg:mandante==time?m-v:v-m
                    })
                }
            }
        }
    }
    return resp
}