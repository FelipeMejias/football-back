import { createIng1 } from "../adicionadas/p1_ING.js"
import { createEsp1 } from "../adicionadas/p4_ESP.js"
import { createIta1 } from "../adicionadas/p2_ITA.js"
import { createAle1 } from "../adicionadas/p3_ALE.js"
import { createFra1 } from "../adicionadas/p5_FRA.js"
import { createAra1 } from "../adicionadas/p8_ARA.js"
import { createArg1 } from "../adicionadas/p9_ARG.js"
import { buildContext, ligas } from "../bancos.js"
import { createPor1 } from "../adicionadas/p7_POR.js"
import { createHol1 } from "../adicionadas/p6_HOL.js"

export function preencher(camp,mandante,visitante,escant,gols){
    const lisE=escant.split(' ')
    const escanteios=[parseInt(lisE[0]),parseInt(lisE[1])]
    const golsTraduzido=[]
    const lis=gols.split(' ')
    for(let item of lis){
        if(item[0]=='0'){
            golsTraduzido.push(-parseInt(item))
        }else{
            golsTraduzido.push(parseInt(item))
        }
    }
    const createCerto=buildContext(camp,true).partidasTotais
    let indice=null
    let part
    for(let k=0;k<createCerto.length&&indice===null;k++){
        const item=createCerto[k]
        if(item[0]==mandante+visitante){
            indice=k
            part=[...item]
        }
    }
    const novaPart=[]
    for(let k=0;k<part.length;k++){
        novaPart.push(part[k])
        if(k==0){
            novaPart.push(escanteios)
            novaPart.push(golsTraduzido)
        }
    }
    const {paths,bancos}=ligas
    bancos[paths.indexOf(camp)].splice(indice, 1, novaPart)
    return novaPart
}