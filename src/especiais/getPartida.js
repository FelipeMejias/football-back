import { buscarApostasJogo } from "./apostas.js"

export function getPartida(partidas,manvis){
    for(let part of partidas){
        if(part[0]==manvis){
            return part
        }
    }
    return false
}
export function create(part,camp){
    const manvis=part[0]
    const escant=part[1]
    const goals=part[2]
    const mandante=manvis[0]+manvis[1]+manvis[2]
    const visitante=manvis[3]+manvis[4]+manvis[5]
    const apostas=buscarApostasJogo(camp,mandante,visitante)
    
    const gols=[]
    let man=0
    let vis=0
    let man1=0
    let man2=0
    let vis1=0
    let vis2=0
    for(let goal of goals){
       if(goal>=0){
        if(goal==46)man2++
        if(goal==1)man1++
             man++
           gols.push({mandante:true,minuto:goal})
       }else{
        if(goal==-46)vis2++
        if(goal==-1)vis1++
         vis++
          gols.push({mandante:false,minuto:-goal})
       }
    }
    const partida={mandante,visitante,escant,gols,placar:[man,vis],t1:[man1,vis1],t2:[man2,vis2],apostas}
    return partida
}
