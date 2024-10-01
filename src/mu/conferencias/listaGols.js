import filtrar, { filtrarGols } from "../../especiais/filtrarPartidas.js"

export  function listaGols(context,estadia,metade,time,c,asc,valor){
    const {partidasTotais}=context
    const resp=[]
    const partidas=filtrar(partidasTotais,time,estadia)
    for(let partida of partidas){
        let golBuscado=0
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        const golos=partida[2]
        const gols=filtrarGols(golos,metade)
        for(let gol of gols){
            if(mandante==time?gol>0:gol<0){
                if(c!=3)golBuscado++
            }else{
                if(c!=1)golBuscado++
            }
        }
        resp.push({
            mandante,visitante,
            numero:golBuscado,
            sg:asc?golBuscado<valor:golBuscado>valor
        })
    }
    
    return resp
}