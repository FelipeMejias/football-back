import Router from 'express'
import { firstGoal } from './src-times/firstGoal.js'
import { whenTies } from './src-times/whenTies.js'
import { whenGolHappens } from './src-times/whenGolHappens.js'
import { winningLosing } from './src-times/winningLosing.js'
import { inicialSituation } from './src-times/inicialSituation.js'
import { totalTempo } from './src-tabelas/totalTempo.js'
import { totalResultado } from './src-tabelas/totalResultado.js'
import { getPartidasTime } from './utils.js'
import { buildContext } from './bancos.js'
import { classificacao } from './src-tabelas/classificacao.js'
import { partidasRodada } from './src-tabelas/partidasRodada.js'
import { adicionar } from './controle.js'
import { general } from './src-times/general.js'
import { totalComparacao } from './src-tabelas/comparar.js'
import { criarOrdem } from './barrinhaFactory.js'

export const router=Router()

router.post('/partidas',adicionar)

router.get('/times/:camp/:time',async(req,res)=>{
    const {time,camp}=req.params
    const context=buildContext(camp)
    const resposta=criarOrdem(time,context)
    res.status(200).send(resposta)
})

router.get('/comparar/:camp',async(req,res)=>{
    const handicap=parseInt(req.query.handicap)
    const {camp}=req.params
    const context=buildContext(camp)
    const resp= totalComparacao(context,handicap)
    res.status(200).send(resp)
})
router.get('/tempos/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    const resp= totalTempo(context,estadia,metade)
    res.status(200).send(resp)
})

router.get('/totais/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    
    const resp= totalResultado(context,estadia,metade)
    res.status(200).send(resp)
})
router.get('/classif/:camp/:rodada',async(req,res)=>{
    const {camp,rodada:rodadaStr}=req.params
    const context=buildContext(camp)
    let rodada=parseInt(rodadaStr)
    let fal=false
    if(rodada==0){
        rodada=context.qtdRodadas
        fal=true
    }
    const partidas=partidasRodada(context,rodada)
    const resp=classificacao(context,rodada)
    const resposta={
        rodadaAtual:fal?context.qtdRodadas:null,
        listaTabela:{
            classif:resp,
            partidas
        }
    }
    res.status(200).send(resposta)
})

router.get('/partidas/:camp/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    const {camp}=req.params
    const {partidasTotais}=buildContext(camp)
    res.status(200).send(getPartida(partidasTotais,id))
})
function getPartida(banco,id){
    for(let part of banco){
        if(part.id==id)return part
    }
}


