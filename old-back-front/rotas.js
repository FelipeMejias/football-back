import {  ordenarIndividual } from './utils.js'
import { buildContext } from './bancos.js'
import { classificacao } from './especiais/classificacao.js'
import { partidasRodada } from './especiais/partidasRodada.js'
import { criarOrdem } from './profundo/individual.js'
import { criarOrdemDupla } from './profundo/dupla.js'
import { partidasTime } from './especiais/partidasTime.js'
import { ultimoGol } from './tabelas/ultimoGol.js'
import { primeiroGol } from './tabelas/primeiroGol.js'
import { placar } from './tabelas/placar.js'
import { mediaGols } from './tabelas/mediaGols.js'
import { comparar } from './tabelas/comparar.js'
import { escanteios } from './tabelas/escanteios.js'
import { marcaPrimeiro } from './tabelas/marcaPrimeiro.js'
import { getPartida } from './especiais/getPartida.js'
import { buildFutura } from './especiais/buildFutura.js'
import { buildAposta } from './especiais/buildAposta.js'
import { destrincharAposta, jaAconteceu } from './especiais/destrincharApostas.js'

export function back_classif(camp,rodada){
    const banco=buildContext(camp,true)
    const {listaTimes,partidasTotais}=buildContext(camp,rodada)
    const {parts,qtd}=partidasTotais
    const partidas=partidasRodada(banco,rodada?rodada:qtd)
    const classif=classificacao(parts,listaTimes,camp)
    const resposta={
        rodadaAtual:qtd,
        listaTabela:{
            classif,
            partidas
        }
    }
    return resposta
}
export function back_primeirogol(camp,estadia){
    const context=buildContext(camp)
    const resp= primeiroGol(context,estadia)
    return resp
}
export function back_ultimogol(camp,estadia){
    const context=buildContext(camp)
    const resp= ultimoGol(context,estadia)
    return resp
}
export function back_comparar(camp,handicap){
    const context=buildContext(camp)
    const resp= comparar(context,handicap)
    return resp
}
export function back_placar(camp,metade,estadia){
    const context=buildContext(camp)
    const resp= placar(context,estadia,metade)
    return resp
}
export function back_mediagols(camp,metade,estadia){
    const context=buildContext(camp)
    const resp= mediaGols(context,estadia,metade)
    return resp
}
export function back_escanteios(camp,estadia){
    const context=buildContext(camp)
    const resp= escanteios(context,estadia)
    return resp
}
export function back_marcaprimeiro(camp,estadia){
    const context=buildContext(camp)
    const resp= marcaPrimeiro(context,estadia)
    return resp
}
export function back_partidasgerais(){
    const lista=buildFutura()
    return lista
}
export function back_partida(camp,partida){
    const {partidasTotais}=buildContext(camp)
    const resp=getPartida(partidasTotais,partida)
    return resp
}
export function back_times(camp,time){
    const context=buildContext(camp)
    const banco=buildContext(camp,true)
    const resposta=criarOrdem(context,time)
    const stats=ordenarIndividual(resposta)
    const partidas=partidasTime(banco,time)
    const resp={stats,partidas}
    return resp
}
export function back_guru(camp,mandante,visitante){
    const context=buildContext(camp,null)
    const banco=buildContext(camp,true)
    let data
    let odds
    banco[0].forEach(part=>{
        if(part[0]==mandante+visitante){
            console.log(part)
            data=part[1]
            odds=part[2]
        }
    })
    const resp=criarOrdemDupla(context,mandante,visitante,odds,camp)
    return {resp,data}
}
export function back_aposta(codigo){
    const aposta=destrincharAposta(codigo)
    return aposta
}

export function back_apostas(pageBet){
    const lista=buildAposta(pageBet)
    return lista
}
export function back_minhasApostas(apostas){
    const resp=apostas.map(codigo=>destrincharAposta(codigo))
    return resp
}
export function back_minhasCombs(lista){
    const resp=[]
    lista.forEach(comb=>{
        const apostas=comb.map(codigo=>destrincharAposta(codigo))
        const apostasOrd=apostas.sort((a,b)=>{
            if(a.data<b.data||!a.data){
                return -1
            }else{return true}
        })
        resp.push(apostasOrd)
    })
    return resp
}
export function back_atualizacaoMinhasApostas(lista){
    const resp=[]
    lista.forEach((cod,index)=>{
        if(jaAconteceu(cod))resp.push(index)
    })
    return resp
}

