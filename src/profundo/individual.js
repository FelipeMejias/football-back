import { totalComparacao } from "../tabelas/comparar.js"
import { totalResultado } from "../tabelas/totalResultado.js"
import { totalTempo } from "../tabelas/totalTempo.js"

let rel
const listaRel=[6,3,3,3,1,1,3,1,1,6,3,3,3,1,1,3,1,1,2,2,2,2,2]
export function criarOrdem(context,time){
    rel=0
    const resp=[]
    let frases=[
        [['com mais vitórias',true],['com menos vitórias',false]],
        [['com mais empates',null],['com menos empates',null]],
        [['com mais derrotas',false],['com menos derrotas',true]],
        [['com maior média de gols marcados',true],['com menor média de gols marcados',false]],
        [['com maior média de gols na partida',null],['com menor média de gols na partida',null]],
        [['com maior média de gols sofridos',false],['com menor média de gols sofridos',true]],
    ]
    let complementos=[
        '',' no 1º tempo',' no 2º tempo'
    ]
    let complementos2=[
        '',' em casa',' fora de casa'
    ]
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(totalResultado(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c,relev}=item
                resp.push({
                    pos,
                    descricao:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    relev,
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
        [['com primeiro gol marcado mais tarde',false],['com primeiro gol marcado mais cedo',true]],
        [['com primeiro gol da partida mais tarde',null],['com primeiro gol da partida mais cedo',null]],
        [['com primeiro gol sofrido mais tarde',true],['com primeiro gol sofrido mais cedo',false]],
        [['com último gol marcado mais tarde',true],['com último gol marcado mais cedo',false]],
        [['com último gol da partida mais tarde',null],['com último gol da partida mais cedo',null]],
        [['com último gol sofrido mais tarde',false],['com último gol sofrido mais cedo',true]],
    ]
    
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(totalTempo(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c,relev}=item
                resp.push({
                    pos,
                    descricao:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    relev,
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
    frases=[
        [['que mais marca gol',true],['que menos marca gol',false]],
        [['que mais segura o resultado',null],['que menos segura o resultado',null]],
        [['que mais sofre gol',false],['que menos sofre gol',true]],
        [['com gol seguinte marcado mais tarde',false],['com gol seguinte marcado mais cedo',true]],
        [['com maior tempo segurando o resultado',null],['com menor tempo segurando o resultado',null]],
        [['com gol seguinte sofrido mais tarde',true],['com gol seguinte sofrido mais cedo',false]],
    ]
    complementos=[
        ' quando está vencendo por 2 ou mais gols',' quando está perdendo por 1 gol',' quando está empatando a partida',' quando está vencendo por 1 gol',' quando está vencendo por 2 ou mais gols'
    ]
    for(let i=-2;i<=2;i++){
        const list=fucarTabela(totalComparacao(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c,relev}=item
            resp.push({
                pos,
                descricao:frases[c-1][asc][0]+complementos[i+2],
                bom:frases[c-1][asc][1],
                valor,
                relev,
                c,
                asc,
                grandeza:3,
                estadia:null,
                metade:null,
                handicap:i
            })
        })
    }
    return resp
}
export function fucarTabela(tabela,time){
    const relev=listaRel[rel]
    rel++
    const resposta=[]
    for(let c=1;c<=6;c++){
        const {pos,asc,valor}=buscarPosicao(tabela,time,c)
        if(valor=='-')continue
        const objeto={
            pos,asc,valor,c,relev
        }
        resposta.push(objeto)
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

