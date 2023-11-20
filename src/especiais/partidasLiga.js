export  function partidasLiga(partidas){
    const resp=[]
    for(let part of partidas){
        const nome=part[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        const gols=part[2]
        if(gols){
            let m=0
            let v=0
            for(let gol of gols){
                if(gol>0){
                    m++
                }else{
                    v++
                }
            }
            resp.push({
                mandante,
                visitante,
                placar:[m,v]
            })
        }else{
            resp.push({
                mandante,
                visitante,
            })
        }
    }
    return resp
}