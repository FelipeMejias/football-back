import { bancoFake, db } from "./index.js"
export async function getPartidasTime(time){
    //const partMandantes=await db.collection('partidas').find({mandante:time}).toArray()
    //const partVisitantes=await db.collection('partidas').find({visitante:time}).toArray()
    const partidasUnordered=bancoFake.filter(part=>(
        part.mandante==time||part.visitante==time
    ))
    //const partidas=ordernarPorRodada([...partMandantes,...partVisitantes])
    const partidas=ordernarPorRodada(partidasUnordered)
    return partidas
}

export async function getPartidas(){
    //const partidasUnordered=await db.collection('partidas').find({}).toArray()
    //const partidasTotais=ordernarPorRodada(partidasUnordered)
    const partidasTotais=ordernarPorRodada(bancoFake)
    return partidasTotais
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