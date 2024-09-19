import { buildContext } from "../bancos.js";
import { analisar } from "../especiais/analise.js";
import { buscarApostasJogo } from "./apostas.js";
import { criarOrdem } from "./individual.js";

export function criarOrdemDupla(camp,mandante,visitante){
    const apostas=buscarApostasJogo(camp,mandante,visitante)
    console.log(apostas)
    const resposta=[]
    for(let aposta of apostas){
        const {info,odd}=aposta
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        let valor=null
        if(grandeza==2||grandeza==6){
            let melhorQtd=0
            let melhorMod=0.61
            for(let item of odd){
                const dif=2.0-parseFloat(item.o)
                const mod=dif>0?dif:-dif
                if(mod<melhorMod){
                    melhorMod=mod
                    melhorQtd=item.q
                }
            }
            valor=melhorQtd
        }
        const analise=analisar(camp,mandante,visitante,grandeza,c,asc,metade,valor)
        console.log(analise)
        resposta.push(analise)
    }
    return resposta
}
