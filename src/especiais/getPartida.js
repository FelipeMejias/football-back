import { confEsc } from "../conferencias/confEsc.js"
import { confGols } from "../conferencias/confGols.js"
import { confPlacar } from "../conferencias/confPlacar.js"
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
    const apostasCru=buscarApostasJogo(camp,mandante,visitante)
    const apostas=greenearApostas(part,apostasCru,mandante)
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
function greenearApostas(part,apostas,mandante){
    const resp=[]
    for(let ap of apostas){
        const {info,odd,texto}=ap
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        if(grandeza!=1){
            const odeee=[]
            for(let esp of odd){
                const {q}=esp
                if(grandeza==2){
                    const green=confGols({partidasTotais:[part]},0,metade,mandante,c,asc,q)
                    odeee.push({...esp,green})

                }else{
                    const green=confEsc({partidasTotais:[part]},0,metade,mandante,c,asc,q)
                    odeee.push({...esp,green})
                }
            }
            resp.push({...ap,odd:odeee})
        }else{
            const green=confPlacar({partidasTotais:[part]},0,metade,mandante,c,asc,null)
            resp.push({...ap,green})
        }
    }
    return resp
}
