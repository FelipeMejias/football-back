import filtrar, { elPushar, filtrarGols } from "../especiais/filtrarPartidas.js"

export  function placar(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=filtrar(partidasTotais,time,estadia)
        let vitorias=0
        let empates=0
        let derrotas=0
        cont=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            let nosso=0
            let deles=0
            const golos=partida[2]
            const gols=filtrarGols(golos,metade)
            for(let gol of gols){
                if(mandante==time?gol>0:gol<0){
                    nosso++
                }else{
                    deles++
                }
            }
            if(nosso>deles){vitorias++}else if(nosso<deles){derrotas++}else{empates++}
            cont++
        }
        const elemento=elPushar(time,vitorias,empates,derrotas,cont,0,true)
        resp.push(elemento)
    }
    return resp
}