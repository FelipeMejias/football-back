import { ligas } from "./src/bancos.js";
import { extrairPassadas } from "./src/especiais/buildApostas.js";
import { buscarApostasJogo } from "./src/apostas.js";

export function maisOuMenos(){
    let adicionais=[]
    let partidas=[]
    const {paths}=ligas
    paths.forEach(camp=>{partidas=[...partidas,...extrairPassadas(camp)]})
    for(let partida of partidas){
        const {camp,mandante,visitante,cinza}=partida
        const {apostasAdicionais}=buscarApostasJogo(camp,mandante,visitante)
        adicionais=[...adicionais,...apostasAdicionais]
    }
    let green=0;let red=0;let lucro=0
    for (let ad of adicionais){
        if(ad.certo==100){
            green++
            lucro+=ad.ultimaOdd
        }else if(ad.certo==0){
            red++
            lucro-=1
        }
    }
    const ord= adicionais.sort((a,b)=>{if(a.ultimaOdd>b.ultimaOdd){return -1}else{return true}})
    const myList=ord.map(ap=>({
        ultima:ap.ultimaOdd,
        precisava:ap.valor,
        foi:ap.qtdReal,
        certo:ap.certo
    }))
    for(let k=0;k<70;k++){
        console.log(myList[k])
    }
    
   // console.log(`greens:${green} / reds:${red} / lucro:${lucro}`)
}