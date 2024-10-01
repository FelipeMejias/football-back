import filtrar from "../../especiais/filtrarPartidas.js"

export  function confEsc(qtd,context,estadia,metade,time,c,asc,valor){
    const {partidasTotais}=context
    const partidas=filtrar(partidasTotais,time,estadia)
    let contCertos=0
    let cont=0
    const partidasNew=[]
    for(let k=0;k<qtd&&k<partidas.length;k++)partidasNew.push(partidas[k])
    for(let partida of partidasNew){
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const escanteios=partida[1]
        let escBuscado
        if(c==1){
            escBuscado=mandante==time?escanteios[0]:escanteios[1]
        }if(c==2){
            escBuscado=escanteios[0]+escanteios[1]
        }if(c==3){
            escBuscado=mandante==time?escanteios[1]:escanteios[0]
        }
        if(asc?escBuscado<valor:escBuscado>valor)contCertos++
        cont++
    }
    return parseFloat((contCertos*100/cont).toFixed(1))
}