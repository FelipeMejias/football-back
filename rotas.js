import Router from 'express'
import { firstGoal } from './src-times/firstGoal.js'
import { whenTies } from './src-times/whenTies.js'
import { whenGolHappens } from './src-times/whenGolHappens.js'
import { winningLosing } from './src-times/winningLosing.js'
import { inicialSituation } from './src-times/inicialSituation.js'
import { totalTempo } from './src-tabelas/totalTempo.js'
import { totalResultado } from './src-tabelas/totalResultado.js'
import {  desempacotar, getPartidasTime } from './utils.js'
import { buildContext } from './bancos.js'
import { classificacao } from './src-tabelas/classificacao.js'
import { partidasRodada } from './src-tabelas/partidasRodada.js'
import { adicionar } from './controle.js'

export const router=Router()

router.post('/partidas',adicionar)
router.get('/times/:camp/:time',async(req,res)=>{
    const {time,camp}=req.params
    const {type}=req.query
    const rodadas=parseInt(req.query.rodadas)
    const {filtros}=req.query
    const {copaType, ignorados}=desempacotar(camp,filtros)
    const who=parseInt(req.query.who)
    const {partidasTotais,qtdRodadas}=buildContext(camp,copaType)
    const partidas=getPartidasTime(partidasTotais,time)
    let resp
    if(type==='1'){
        resp= firstGoal(partidas,ignorados,rodadas,time,who)
    }else if(type==='2'){
        resp= whenTies(partidas,ignorados,rodadas,time,who)
    }else if(type==='3'){
        resp= whenGolHappens(partidas,ignorados,rodadas,time,who)
    }else if(type==='4'){
        resp= winningLosing(partidas,ignorados,rodadas,time,who)
    }else if(type==='9'){
        resp= winningLosing(partidas,ignorados,rodadas,time,null,true)
    }else if(type==='10'){
        resp= inicialSituation(partidas,ignorados,rodadas,time)
    }
    res.status(200).send({
        ...resp,
        qtdRodadas
    })
})

router.get('/tempos/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {filtros}=req.query
    const {camp}=req.params
    const {copaType, ignorados}=desempacotar(camp,filtros)
    const context=buildContext(camp,copaType)
    const resp= totalTempo(context,ignorados,rodadas,estadia,metade)
    res.status(200).send({
        qtdRodadas:context.qtdRodadas,
        listaTabela:resp
    })
})

router.get('/totais/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {camp}=req.params
    const {filtros}=req.query
    const {copaType, ignorados}=desempacotar(camp,filtros)
    const context=buildContext(camp,copaType)
    const resp= totalResultado(context,ignorados,rodadas,estadia,metade)
    res.status(200).send({
        qtdRodadas:context.qtdRodadas,
        listaTabela:resp
    })
})
router.get('/classif/:camp/:rodada',async(req,res)=>{
    
    const {camp,rodada:rodadaStr}=req.params
    const rodada=parseInt(rodadaStr)
    const context=buildContext(camp,[true,false,false,false,false])
    const {partidasTotais,listaTimes}=context
    let listaTabela
    if(camp=='wc'){
        const partidas=[]
        const classif=[]
        let j=0
        for(let k=0;k<8;k++){
            const times=[listaTimes[j],listaTimes[j+1],listaTimes[j+2],listaTimes[j+3]]
            const pT=partidasTotais.filter(part=>times.includes(part.mandante))
            const pF=bancoWcFuturo.filter(part=>times.includes(part.mandante))
            const groupContext={partidasTotais:pT,listaTimes:times}
            const futureContext={partidasTotais:pF,listaTimes:times}
            partidas.push([...partidasRodada(groupContext,rodada),...partidasRodada(futureContext,rodada)])
            classif.push(classificacao(groupContext,rodada))
            j+=4
        }
        listaTabela={
            classif,
            partidas
        }
    }else{
        const partidas=partidasRodada(context,rodada)
        const resp=classificacao(context,rodada)
        listaTabela={
            classif:resp,
            partidas
        }
    }
    res.status(200).send({
        qtdRodadas:context.qtdRodadas,
        listaTabela
    })
})

router.get('/partidas/:camp/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    const {camp}=req.params
    const {partidasTotais}=buildContext(camp,[true,true,true,true,true])
    res.status(200).send(id<1000?getPartida(partidasTotais,id):getPartidaFuturo(bancoWcFuturo,id))
})
function getPartida(banco,id){
    for(let part of banco){
        if(part.id==id)return part
    }
}


