export  function partidasRodada(context,rodada){
    const {partidasTotais}=context
    const partidas=partidasTotais.filter(part=>(part.rodada==rodada))
    const resp=[]
    for(let part of partidas){
        const {mandante,visitante,gols,id}=part
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
                mandante,
                visitante,
                placar:[m,v]
            })
        }else{
            resp.push({
                id,
                mandante,
                visitante,
            })
        }
    }
    return resp
}
