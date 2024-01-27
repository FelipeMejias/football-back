import filtrar, { elPushar, filtrarGols } from "../especiais/filtrarPartidas.js";

export  function mediaGols(context,estadia,metade){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=filtrar(partidasTotais,time,estadia)
        let golsPro=0;
        let golsTotal=0;
        let golsContra=0;
        cont=0
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const golos=partida[2]
            const gols=filtrarGols(golos,metade)
            for(let gol of gols){
                if(mandante==time?gol>0:gol<0){
                    golsPro++;golsTotal++
                }else{
                    golsContra++;golsTotal++
                }
            }
            cont++
        }
        const elemento=elPushar(time,golsPro,golsTotal,golsContra,cont,2,false)
        resp.push(elemento)
    }
    return resp
}