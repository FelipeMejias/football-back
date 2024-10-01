import filtrar, { elPushar } from "../../especiais/filtrarPartidas.js";

export  function marcaPrimeiro(context,estadia){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=filtrar(partidasTotais,time,estadia)
        let pro=0;
        let sem=0;
        let con=0;
        cont=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const gols=partida[2]
            if(gols.length>0){
                const gol=gols[0]
                if(mandante==time?gol>0:gol<0){
                    pro++
                }else{con++}
            }else{
                sem++
            }
            cont++
        }
        const elemento=elPushar(time,pro,sem,con,cont,0,true)
        resp.push(elemento)
    }
    return resp
}