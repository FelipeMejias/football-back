import { tetoPosicao } from "../../index.js";
import { buildContext } from "../bancos.js";
import { buscarApostasJogo } from "./apostas.js";
import { criarOrdem } from "./individual.js";

export function criarOrdemDupla(camp,mandante,visitante){
    const tetoReal=tetoPosicao+(camp=='arg1'?1:0)
    const context=buildContext(camp)
    const ordemMandante=criarOrdem(context,mandante)
    const ordemVisitante=criarOrdem(context,visitante)
    const listao=[]
    const apostas=buscarApostasJogo(camp,mandante,visitante)
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap,pos}=est
        const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
        if(par){
                listao.push([est,par])
        }
    })
    const ordenada1= listao.sort((a,b)=>{
        const somaA=a[0].pos+a[1].pos
        const somaB=b[0].pos+b[1].pos
        if(somaA<somaB || (somaA==somaB && a[0].relev>b[0].relev)){
            return -1
        }else{return true}
    })
    for(let parzinho of ordenada1){
        if(parzinho[0].pos<=tetoReal&&parzinho[1].pos<=tetoReal){
            const {grandeza,c,asc,metade}=parzinho[0]
            const codigo=`${grandeza}${c}${asc}${metade}`
            for(let k=0;k<apostas.length;k++){
                const ap=apostas[k]
                if(ap.info==codigo){
                    apostas.splice(k,1)
                    parzinho.push(ap)
                }
            }
        }
    }
    const ordenada2= ordenada1.sort((a,b)=>{
        if(a.length>b.length){
            return -1
        }else{return true}
    })
    return ordenada2
}
export function acharPar(lista,grandezaa,cc,ascc,estadiaa,metadee,handicapp){
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
 