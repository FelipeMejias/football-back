import { quantoTempoFalta } from "../utils.js"
import { buildContext } from "../bancos.js"
import { criarOrdemDuplaAposta } from "../adicionadas/constr.js"

export function buildFutura(){
    let desordenada=[]
    const camps=[/*'bra1',*/'ing1','esp1','ita1','ale1'/*,'bra2'*/]
    camps.forEach(camp=>{
        desordenada=[...desordenada,...extrairFuturas(camp)]
    })
    const ordenada1= desordenada.sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    const ordenada2= ordenada1.sort((a,b)=>{
        if(a.texto!=='Finalizado' && b.texto=='Finalizado'){
            return -1
        }else{return true}
    })
    return ordenada2
}
function extrairFuturas(camp){
    const {partidasTotais}=buildContext(camp,true)
    const resp=[]
    for(let k=0;k<partidasTotais.length;k++){
        const part=partidasTotais[k]
        if(part[1].length!=2){
            
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            /*if(camp=='ale1'){
                const context=buildContext(camp)
                criarOrdemDuplaAposta(context,camp,mandante,visitante,2)
            }*/
            const data=part[1]
            const texto=quantoTempoFalta(data)
            resp.push({
                mandante,visitante,data,texto,camp
            })
        }else{
            return resp
        }
    }
    return resp
}