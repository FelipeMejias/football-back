import { buildContext, ligas } from "../bancos.js";
import { buscarApostasJogo } from "./apostasNovo.js";
import { criarOrdem } from "./individualPraDupla.js";

export function criarOrdemDuplaPreflop(camp,mandante,visitante,inteiro=false){
    const {contexts,paths}=ligas
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const nomeM=listaNomes[listaTimes.indexOf(mandante)]
    const nomeV=listaNomes[listaTimes.indexOf(visitante)]

    const context=buildContext(camp,inteiro?1:false)
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
        if(somaA<somaB){
            return -1
        }else{return true}
    })
    for(let parzinho of ordenada1){
        if(true){
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
    const respFinal=[]
    ordenada2.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap}=est[0]
        const par=acharQuarteto(ordenada2,grandeza,c,asc,estadia,metade,handicap)
        const dica=darDica(grandeza,c,asc,metade,nomeM,nomeV)
        if(par){
            respFinal.push([est,par,dica])
        }
    })
    return respFinal
    
}
function darDica(grandeza,c,asc,metade,nomeM,nomeV){
    let r=''
    if(grandeza==1){
        if(c==1 && !asc)r+=`${nomeM} vencer`
        if(c==3 && !asc)r+=`${nomeV} vencer`
        if(metade==0)r+=' a partida'
        if(metade==1)r+=' o 1º tempo'
        if(metade==2)r+=' o 2º tempo'
        return r
    }
    if(grandeza==2){
        if(asc)r+='Poucos gols'
        if(!asc)r+='Muitos gols'
        if(c==1)r+=` para ${nomeM}`
        if(c==3)r+=` para ${nomeV}`
        if(metade==0)r+=' na partida'
        if(metade==1)r+=' no 1º tempo'
        if(metade==2)r+=' no 2º tempo'
        return r
    }
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
export function acharQuarteto(lista,grandezaa,cc,ascc,estadiaa,metadee,handicapp){
    for(let k=0;k<lista.length;k++){
        const {grandeza,c,asc,estadia,metade,handicap}=lista[k][1]
        if(
            grandeza==grandezaa
            &&asc==ascc
            &&((estadia==0&&estadiaa==1))
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
 