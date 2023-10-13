import { comparar } from "../tabelas2/comparar.js"
import { escanteios } from "../tabelas2/escanteios.js"
import { marcaPrimeiro } from "../tabelas2/marcaPrimeiro.js"
import { mediaGols } from "../tabelas2/mediaGols.js"
import { placar } from "../tabelas2/placar.js"
import { primeiroGol } from "../tabelas2/primeiroGol.js"
import { ultimoGol } from "../tabelas2/ultimoGol.js"

const RELEVANCIA1=16 //PLACAR
const RELEVANCIA2=15 //MEDIA GOLS
const RELEVANCIA3=1  //1o GOL
const RELEVANCIA4=1  //Uo GOL
const RELEVANCIA5=5  //VANTAGEM
const RELEVANCIA6=10 //ESCANTEIOS
const RELEVANCIA7=12 //PRIMEIRO A MARCAR

export function criarOrdem(context,time){
    const resp=[]
    let frases=[
        [['com mais vitórias',true],['com menos vitórias',false]],
        [['com mais empates',null],['com menos empates',null]],
        [['com mais derrotas',false],['com menos derrotas',true]],
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
                const {pos,asc,valor,c,relev}=item
                resp.push({
                    pos,
                    descricao:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    relev:RELEVANCIA1-(i?1:0)-(j?1:0),
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
        [['com maior média de gols marcados',true],['com menor média de gols marcados',false]],
        [['com maior média de gols',null],['com menor média de gols',null]],
        [['com maior média de gols sofridos',false],['com menor média de gols sofridos',true]],
    ]
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(mediaGols(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c,relev}=item
                resp.push({
                    pos,
                    descricao:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    relev:RELEVANCIA2-(i?1:0)-(j?1:0),
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
        [['que mais marca o primeiro gol',true],['que menos marca o primeiro gol',false]],
        [['com mais 0x0',null],['com menos 0x0',null]],
        [['que mais sofre o primeiro gol',false],['que menos sofre o primeiro gol',true]],

    ]
    for(let i=0;i<=2;i++){
        const list=fucarTabela(marcaPrimeiro(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c,relev}=item
            resp.push({
                pos,
                descricao:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                relev:RELEVANCIA3-(i?1:0),
                c,
                asc,
                grandeza:7,
                estadia:i,
                metade:null,
                handicap:null
            })
        })
    }
    frases=[
        [['com mais escanteios a favor',true],['com menos escanteios a favor',false]],
        [['com mais escanteios na partida',null],['com menos escanteios na partida',null]],
        [['com mais escanteios contra',false],['com menos escanteios contrários',true]],
    ]
    for(let i=0;i<=2;i++){
        const list=fucarTabela(escanteios(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c,relev}=item
            resp.push({
                pos,
                descricao:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                relev:RELEVANCIA4-(i?1:0),
                c,
                asc,
                grandeza:6,
                estadia:i,
                metade:null,
                handicap:null
            })
        })
    }
    frases=[
        [['com primeiro gol marcado mais tarde',false],['com primeiro gol marcado mais cedo',true]],
        [['com primeiro gol da partida mais tarde',null],['com primeiro gol da partida mais cedo',null]],
        [['com primeiro gol sofrido mais tarde',true],['com primeiro gol sofrido mais cedo',false]],
    ]
    
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(primeiroGol(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c,relev}=item
                resp.push({
                    pos,
                    descricao:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    relev:RELEVANCIA7-(i?1:0)-(j?1:0),
                    c,
                    asc,
                    grandeza:3,
                    estadia:i,
                    metade:j,
                    handicap:null
                })
            })
        }
    }
    frases=[
        [['com último gol marcado mais tarde',true],['com último gol marcado mais cedo',false]],
        [['com último gol da partida mais tarde',null],['com último gol da partida mais cedo',null]],
        [['com último gol sofrido mais tarde',false],['com último gol sofrido mais cedo',true]],
    ]
    for(let i=0;i<=2;i++){
        for(let j=0;j<=2;j++){
            const list=fucarTabela(ultimoGol(context,i,j),time)
            list.forEach(item=>{
                const {pos,asc,valor,c,relev}=item
                resp.push({
                    pos,
                    descricao:frases[c-1][asc][0]+complementos[j]+complementos2[i],
                    bom:frases[c-1][asc][1],
                    valor,
                    relev:RELEVANCIA5-(i?1:0)-(j?1:0),
                    c,
                    asc,
                    grandeza:4,
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
    ]
    complementos=[
        ' quando está perdendo',' quando está empatando',' quando está vencendo'
    ]
    for(let i=-1;i<=1;i++){
        const list=fucarTabela(comparar(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c,relev}=item
            resp.push({
                pos,
                descricao:frases[c-1][asc][0]+complementos[i+1],
                bom:frases[c-1][asc][1],
                valor,
                relev:RELEVANCIA6,
                c,
                asc,
                grandeza:5,
                estadia:null,
                metade:null,
                handicap:i
            })
        })
    }
    return resp
}
export function fucarTabela(tabela,time){
    const resposta=[]
    for(let c=1;c<=3;c++){
        const {pos,asc,valor,relev}=buscarPosicao(tabela,time,c)
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