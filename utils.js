import { db } from "./index.js"
export async function getFootballData(time){
    const partMandantes=await db.collection('partidas').find({mandante:time}).toArray()
    const partVisitantes=await db.collection('partidas').find({visitante:time}).toArray()
    const partidas=ordernarPorRodada([...partMandantes,...partVisitantes])
    const golListUnorder=await db.collection('gols').find({}).toArray()
    const golList=ordenarGols(golListUnorder)
    return{golList,partidas}
}

export async function getTabelaData(){
    const partidasUnordered=await db.collection('partidas').find({}).toArray()
    const partidasTotais=ordernarPorRodada(partidasUnordered)
    const golListUnorder=await db.collection('gols').find({}).toArray()
    const golList=ordenarGols(golListUnorder)
    return{golList,partidasTotais}
}

export function ordenarGols(gols){
    const golList=[]
    const used=[]
    let menor
    let use
    for(let i=0;i<gols.length;i++){
        menor={minuto:Infinity}
        use=0
        for(let j=0;j<gols.length;j++){
            if(used.includes(j))continue;
            if(gols[j].minuto<menor.minuto){
                menor=gols[j]
                use=j
            }
        }
        golList.push(menor)
        used.push(use)
    }
    return golList
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