import { comparar } from "../mu/tabelas/comparar.js"
import { escanteios } from "../mu/tabelas/escanteios.js"
import { marcaPrimeiro } from "../mu/tabelas/marcaPrimeiro.js"
import { marcaUltimo } from "../mu/tabelas/marcaUltimo.js"
import { mediaGols } from "../mu/tabelas/mediaGols.js"
import { placar } from "../mu/tabelas/placar.js"
import { primeiroGol } from "../mu/tabelas/primeiroGol.js"
import { ultimoGol } from "../mu/tabelas/ultimoGol.js"

export function criarOrdem(context,time,enxuta=false){
    const resp=[]
    let frases=[
        [['vitórias',true],['vitórias',false]],
        [['empates',null],['empates',null]],
        [['derrotas',false],['derrotas',true]],
    ]
    let complementos=[
        '',' no 1º tempo',' no 2º tempo'
    ]
    let complementos2=[
        '',' em casa',' fora de casa'
    ]
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(placar(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c}=item
                if(c!=2&&!asc)resp.push({
                    pos,
                    descricao:i!=0?complementos2[i]:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    c,
                    asc,
                    grandeza:1,
                    estadia:i,
                    metade:j,
                    handicap:null
                })
            })
        }
    }
    frases=[
        [['média de gols marcados',true],['média de gols marcados',false]],
        [['média de gols',null],['média de gols',null]],
        [['média de gols sofridos',false],['média de gols sofridos',true]],
    ]
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(mediaGols(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c}=item
                resp.push({
                    pos,
                    descricao:i!=0?complementos2[i]:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    c,
                    asc,
                    grandeza:2,
                    estadia:i,
                    metade:j,
                    handicap:null
                })
            })
        }
    }
    /*frases=[
        [['escanteios a favor',true],['escanteios a favor',false]],
        [['escanteios na partida',null],['escanteios na partida',null]],
        [['escanteios contrários',false],['escanteios contrários',true]],
    ]
    for(let i=0;i<=2;i++){
        const list=fucarTabela(escanteios(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c}=item
            resp.push({
                pos,
                descricao:i!=0?complementos2[i]:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                c,
                asc,
                grandeza:6,
                estadia:i,
                metade:0,
                handicap:null
            })
        })
    }
    frases=[
        [['que mais marca o primeiro gol',true],['que menos marca o primeiro gol',false]],
        [['partida sem gols',null],['partida sem gols',null]],
        [['que mais sofre o primeiro gol',false],['que menos sofre o primeiro gol',true]],

    ]
    for(let i=0;i<=2;i++){
        const list=fucarTabela(marcaPrimeiro(context,i),time,true)
        list.forEach(item=>{
            const {pos,asc,valor,c}=item
            if(c!=2)resp.push({
                pos,
                descricao:i!=0?complementos2[i]:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                c,
                asc,
                grandeza:7,
                estadia:i,
                metade:0,
                handicap:null
            })
        })
    }
    frases=[
        [['que mais marca o último gol',true],['que menos marca o último gol',false]],
        [['partida sem gols',null],['partida sem gols',null]],
        [['que mais sofre o último gol',false],['que menos sofre o último gol',true]],

    ]
    for(let i=0;i<=2;i++){
        const list=fucarTabela(marcaUltimo(context,i),time,true)
        list.forEach(item=>{
            const {pos,asc,valor,c}=item
            if(c!=2)resp.push({
                pos,
                descricao:i!=0?complementos2[i]:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                c,
                asc,
                grandeza:8,
                estadia:i,
                metade:0,
                handicap:null
            })
        })
    }*/
    return resp.sort((a,b)=>{if(a.pos<b.pos){return -1}else{return true}})
}
export function fucarTabela(tabela,time,bloqueio_c2=false){
    const resposta=[]
    for(let c=1;c<=3;c++){
        const {pos,asc,valor}=buscarPosicao(tabela,time,c)
        if(valor=='-')continue
        const objeto={
            pos,asc,valor,c
        }
        if(!bloqueio_c2||c!=2)resposta.push(objeto)
    }
    return resposta
}
function buscarPosicao(lista,time,c){
    const caso0=ordenarCresc(lista,time,c)
    const caso1=ordenarDescr(lista,time,c)
    if(caso0.pos<caso1.pos){
        return {
            ...caso0,asc:0
        }
    }else{
        return {
            ...caso1,asc:1
        }
    }
}

function ordenarCresc(lista,time,c){
    const ordenada= lista.sort((a,b)=>{
        if(a[`c${c}`]>b[`c${c}`]){
            return -1
        }else{return true}
    })
    for(let k=0;k<ordenada.length;k++){
        const objeto=lista[k]
        if(objeto.time==time){
            return {
                pos:k+1,
                valor:objeto[`c${c}`]
            } 
        }
    }
}
function ordenarDescr(lista,time,c){
    const ordenada= lista.sort((a,b)=>{
        if(a[`c${c}`]<=b[`c${c}`]){
            return -1
        }else{return true}
    })
    for(let k=0;k<ordenada.length;k++){
        const objeto=lista[k]
        if(objeto.time==time){
            return {
                pos:k+1,
                valor:objeto[`c${c}`]
            } 
        }
    }
}