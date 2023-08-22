import { ordenarDupla } from "../utils.js";
import { criarOrdem } from "./individual2.js";

export function criarOrdemDupla(context,mandante,visitante){
    const ordemMandante=criarOrdem(context,mandante)
    const ordemVisitante=criarOrdem(context,visitante)
    const listao=[]
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap}=est
        const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
        if(par){
            listao.push([est,par])
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
                (c==1&&cc==3)||(cc==1&&c==3)||
                (c==2&&cc==2)||(cc==5&&c==5)||
                (c==4&&cc==6)||(cc==4&&c==6)
            )
        ){
            return lista[k]
        }
    }
    return null
}