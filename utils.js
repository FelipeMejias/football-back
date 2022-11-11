export function getPartidasTime(banco,time){
    const partidas=banco.filter(part=>(
        part.mandante==time||part.visitante==time
    ))
    return partidas
}

