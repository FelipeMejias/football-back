import filtrar, { elPushar } from "../../especiais/filtrarPartidas.js";

export  function escanteios(context,estadia){
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
            const escant=partida[1]
            if(mandante==time){
                golsPro+=escant[0]
                golsTotal+=escant[0]
                golsTotal+=escant[1]
                golsContra+=escant[1]
            }else{
                golsPro+=escant[1]
                golsTotal+=escant[0]
                golsTotal+=escant[1]
                golsContra+=escant[0]
            }
            cont++
        }
        const elemento=elPushar(time,golsPro,golsTotal,golsContra,cont,1,false)
        resp.push(elemento)
    }
    return resp
}