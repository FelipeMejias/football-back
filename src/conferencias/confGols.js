import filtrar, { filtrarGols } from "../especiais/filtrarPartidas.js"

export  function confGols(qtd,context,estadia,metade,time,c,asc,valor){
    const {partidasTotais}=context
    const partidas=filtrar(partidasTotais,time,estadia)
    let contCertos=0
    let cont=0
    const partidasNew=[]
    const qtdReal=qtd>partidas.length?partidas.length:qtd
    for(let k=0;k<qtdReal;k++){
        partidasNew.push(partidas[k])
    }
    for(let partida of partidasNew){
        let golBuscado=0
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const golos=partida[2]
        const gols=filtrarGols(golos,metade)
        for(let gol of gols){
            if(mandante==time?gol>0:gol<0){
                if(c!=3)golBuscado++
            }else{
                if(c!=1)golBuscado++
            }
        }
        if(asc?golBuscado<valor:golBuscado>valor)contCertos++
        cont++
    }
    return parseFloat((contCertos*100/cont).toFixed(1))
}