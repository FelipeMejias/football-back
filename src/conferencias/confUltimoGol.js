import filtrar, { filtrarGols } from "../especiais/filtrarPartidas.js"

export  function confUltimoGol(qtd,context,estadia,metade,time,c,asc,valor){
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
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const golos=partida[2]
        let golChave=0
        if(golos){
            const gol=golos[golos.length-1]
            if(mandante==time?gol>0:gol<0){
                golChave=1
            }else if(mandante==time?gol<0:gol>0){
                golChave=-1
            }
        }
        if(asc){
            if(c==1){
                if(golChave!=-1)contCertos++
            }else if(c==3){
                if(golChave!=1)contCertos++
            }
        }else{
            if(c==1){
                if(golChave==1)contCertos++
            }else if(c==3){
                if(golChave==-1)contCertos++
            }
        }
        cont++
    }
    return parseFloat((contCertos*100/cont).toFixed(1))
}