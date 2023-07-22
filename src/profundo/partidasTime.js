export  function partidasTime(context,time){
    const {partidasTotais}=context
    const partidas=partidasTotais.filter(part=>(part.mandante==time||part.visitante==time))
    const resp=[]
    for(let part of partidas){
        const {mandante,visitante,gols,id,rodada}=part
        let m=0
        let v=0
        if(gols){
            for(let gol of gols){
                if(gol.mandante){
                    m++
                }else{
                    v++
                }
            }
            resp.push({
                id,
                rodada,
                mandante,
                visitante,
                placar:[m,v],
                sg:mandante==time?m-v:v-m
            })
        }else{
            resp.push({
                id,
                rodada,
                mandante,
                visitante,
                sg:mandante==time?m-v:v-m
            })
        }
    }
    return resp
}