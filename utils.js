export function getPartidasTime(banco,time){
    const partidas=banco.filter(part=>(
        part.mandante==time||part.visitante==time
    ))
    return partidas
}

export function desempacotar(camp,filtros){
    if(camp=='wc')return {copaType:toListInt(filtros), ignorados:[]}
    return {copaType:null, ignorados:toListStr3(filtros)}
}
function toListInt(string){
    const list=string.split('-')
    return list.map(str=>(parseInt(str)))
}
function toListStr3(string){
    const list=string.split('-')
    return list
}
export function buildTimeResponse(ganhou,empatou,perdeu,listFez,listNada,listTomou){
    const total=(ganhou+empatou+perdeu)/100
    const fezLen=listFez.length
    const tomouLen=listTomou.length
    const nadaLen=listNada.length
    const totalList=(fezLen+nadaLen+tomouLen)/100
    const resp={
        resultados:{
            ganhou:{total:ganhou,perc:(ganhou?ganhou/total:0)},
            empatou:{total:empatou,perc:(empatou?empatou/total:0)},
            perdeu:{total:perdeu,perc:(perdeu?perdeu/total:0)}
        },
        fez:{
            lista:listFez,
            perc:(fezLen?fezLen/totalList:0),
            total:fezLen
        },
        nada:{
            lista:listNada,
            perc:(nadaLen?nadaLen/totalList:0),
            total:nadaLen
        },
        tomou:{
            lista:listTomou,
            perc:(tomouLen?tomouLen/totalList:0),
            total:tomouLen
        },
    }
    return resp
}