import { ordenarDupla } from "../utils.js";
import { acharAposta } from "./aposta.js";
import { criarOrdem } from "./individual2.js";

export function criarOrdemDupla(context,mandante,visitante,onFav=false){
    const ordemMandante=criarOrdem(context,mandante)
    const ordemVisitante=criarOrdem(context,visitante)
    const listao=[]
    let x=true
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap,pos}=est
        if(pos>3 && pos<18 && onFav){}else{
            const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
            const aposta=acharAposta(est)
            if(par){
                if(aposta){
                    const x=[est,par,aposta]
                    listao.push(x)
                }else{
                    listao.push([est,par])
                }
            }
    
        }
    })
    return ordenarDupla(listao)
}
function acharPar(lista,grandezaa,cc,ascc,estadiaa,metadee,handicapp){
    for(let k=0;k<lista.length;k++){
        const {grandeza,c,asc,estadia,metade,handicap}=lista[k]
        if(
            grandeza==grandezaa
            &&asc==ascc
            &&(!estadia&&!estadiaa||(estadia==2&&estadiaa==1))
            &&metade==metadee
            &&(!handicapp&&!handicap||handicap==-handicapp)
            &&(
                (c==1&&cc==3)||(cc==1&&c==3)||(c==2&&cc==2)
            )
        ){
            return lista[k]
        }
    }
    return null
}