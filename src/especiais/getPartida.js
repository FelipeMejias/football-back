import { buscarApostasJogo } from "../profundo/apostas.js"

export function getPartida(partidas,manvis){
    for(let part of partidas){
        if(part[0]==manvis){
            return part
        }
    }
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
    for(let goal of goals){
       if(goal>=0){
             man++
           gols.push({mandante:true,minuto:goal})
       }else{
         vis++
          gols.push({mandante:false,minuto:-goal})
       }
    }
    const partida={mandante,visitante,escant,gols,placar:[man,vis],apostas}
    return partida
}
