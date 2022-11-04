import Router from 'express'
import { bancoFake } from "./index.js"
import { firstGoal } from './src-times/firstGoal.js'
import { whenTies } from './src-times/whenTies.js'
import { whenGolHappens } from './src-times/whenGolHappens.js'
import { winningLosing } from './src-times/winningLosing.js'
import { inicialSituation } from './src-times/inicialSituation.js'
import { totalTempo } from './src-tabelas/totalTempo.js'
import { totalResultado } from './src-tabelas/totalResultado.js'
import { qtdRodadas } from './utils.js'

export const router=Router()

router.post('/times/:time',async(req,res)=>{
    const {time}=req.params
    const {type}=req.query
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const who=parseInt(req.query.who)
    let resp
    if(type==='1'){
        resp= firstGoal(ignorados,rodadas,time,who)
    }else if(type==='2'){
        resp= whenTies(ignorados,rodadas,time,who)
    }else if(type==='3'){
        resp= whenGolHappens(ignorados,rodadas,time,who)
    }else if(type==='4'){
        resp= winningLosing(ignorados,rodadas,time,who)
    }else if(type==='9'){
        resp= winningLosing(ignorados,rodadas,time,null,true)
    }else if(type==='10'){
        resp= inicialSituation(ignorados,rodadas,time)
    }
    res.status(200).send({
        ...resp,
        qtdRodadas:qtdRodadas()
    })
})

router.post('/tempos',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const resp= totalTempo(ignorados,rodadas,estadia,metade)
    res.status(200).send({
        qtdRodadas:qtdRodadas(),
        listaTabela:resp
    })
})

router.post('/totais',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const resp= totalResultado(ignorados,rodadas,estadia,metade)
    res.status(200).send({
        qtdRodadas:qtdRodadas(),
        listaTabela:resp
    })
})

router.get('/partidas/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    let partida
    for (let part of bancoFake){
        if(part.id==id){
            partida=part
            break;
        }
    }
    res.status(200).send(partida)
})