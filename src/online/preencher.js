import { buildContext, ligas } from "../bancos.js"
import { preFlop } from "../profundo/preflop.js"

export function preencher(camp,mandante,visitante,part){
    const createCerto=buildContext(camp,true).partidasTotais
    let indice=null
    for(let k=0;k<createCerto.length&&indice===null;k++){
        const item=createCerto[k]
        if(item[0]==mandante+visitante){
            indice=k
        }
    }
    const {paths,bancos}=ligas
    bancos[paths.indexOf(camp)].splice(indice, 1, part)
    return part
}

export function preencherPartidas(camp,infos){
    const {bancos,paths}=ligas
    for(let item of infos){
        bancos[paths.indexOf(camp)].unshift(item)
    }
    return true
}
