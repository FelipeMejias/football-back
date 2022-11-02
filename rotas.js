import Router from 'express'
import { db } from "./index.js"
import { firstGoal } from './firstGoal.js'
import { whenTies } from './whenTies.js'
import { whenGolHappens } from './whenGolHappens.js'
import { winningLosing } from './winningLosing.js'
import { ordenarGols } from './utils.js'
import { inicialSituation } from './inicialSituation.js'
import { totalTempo } from './totalTempo.js'
import { totalResultado } from './totalResultado.js'

export const router=Router()

router.post('/times/:time',async(req,res)=>{
    const {time}=req.params
    const {type}=req.query
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const who=parseInt(req.query.who)
    let resp
    if(type==='1'){
        resp=await firstGoal(ignorados,rodadas,time,who)
    }else if(type==='2'){
        resp=await whenTies(ignorados,rodadas,time,who)
    }else if(type==='3'){
        resp=await whenGolHappens(ignorados,rodadas,time,who)
    }else if(type==='4'){
        resp=await winningLosing(ignorados,rodadas,time,who)
    }else if(type==='9'){
        resp=await winningLosing(ignorados,rodadas,time,null,true)
    }else if(type==='10'){
        resp=await inicialSituation(ignorados,rodadas,time)
    }
    res.status(200).send(resp)
})

router.post('/tempos',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const resp=await totalTempo(ignorados,rodadas,estadia,metade)
    res.status(200).send(resp)
})

router.post('/totais',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const resp=await totalResultado(ignorados,rodadas,estadia,metade)
    res.status(200).send(resp)
})

router.get('/partidas/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    const partida=await db.collection('partidas').findOne({id})
    const golsUnordered=await db.collection('gols').find({partidaId:id}).toArray()
    const gols=ordenarGols(golsUnordered)
    const resp={partida,gols}
    res.status(200).send(resp)
})