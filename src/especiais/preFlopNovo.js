import { criarOrdemDuplaPreflop } from "./duplaNova.js"
export function preFlop(camp,mandante,visitante){
    const resp=criarOrdemDuplaPreflop(camp,mandante,visitante)
    const resposta=resp.map(item=>{
        const [casaFora,neutro,frase]=item
        return {
            frase,num:null,analise:casaFora[0],comOdds:false
        }
    })
    const r=resposta.sort((a,b)=>{if(a.analise.grandeza<b.analise.grandeza){return -1}else{return true}})
    console.log(r)
        return r
}