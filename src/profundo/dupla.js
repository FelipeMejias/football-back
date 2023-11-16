import { criarOrdem } from "./individual.js";

export function criarOrdemDupla(context,mandante,visitante){
    const ordemMandante=criarOrdem(context,mandante)
    const ordemVisitante=criarOrdem(context,visitante)
    const listao=[]
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap,pos}=est
        const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
        if(par){
            listao.push([est,par])
        }else{
            
        }
    })
    return ordenarDupla(listao)
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
function ordenarDupla(lista){
    const used=[]
    const final=[]
    for(let k=0;k<lista.length;k++){
        let using
        let melhorSoma=Infinity
        let relev=-Infinity
        let tamanho=1
        let duplinha
        for(let h=0;h<lista.length;h++){
            if(used.includes(h))continue
            const item=lista[h]
            const mandante=item[0]
            const visitante=item[1]
            const len=item.length
            const soma=mandante.pos+visitante.pos
            if( len>tamanho||( len==tamanho &&soma<melhorSoma || ( len==tamanho &&soma==melhorSoma && mandante.relev>relev ))){
                using=h
                melhorSoma=soma
                relev=mandante.relev
                duplinha=item
                tamanho=len
            }
        }
        used.push(using)
        final.push(duplinha)
    }
    return final
}
