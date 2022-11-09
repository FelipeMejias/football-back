import { bancoFake } from "./index.js"
export function getPartidasTime(banco,time){
    const partidasUnordered=banco.filter(part=>(
        part.mandante==time||part.visitante==time
    ))
    const partidas=ordernarPorRodada(partidasUnordered)
    return partidas
}

export function getPartidas(){
    const partidasTotais=ordernarPorRodada(bancoFake)
    return partidasTotais
}

export function qtdRodadas(){
    return Math.ceil(bancoFake.length/10)
} 

function ordernarPorRodada(list){
    const used=[]
    const resp=[]
    let maior
    let use
    for(let i=0;i<list.length;i++){
        maior={rodada:-Infinity}
        use=0
        for(let j=0;j<list.length;j++){
            if(used.includes(j))continue;
            if(list[j].rodada>maior.rodada){
                maior=list[j]
                use=j
            }
        }
        resp.push(maior)
        used.push(use)
    }
    return resp
}