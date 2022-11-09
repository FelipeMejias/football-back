import Router from 'express'
import { bancoEliminatorias, bancoFake } from "./index.js"
import { firstGoal } from './src-times/firstGoal.js'
import { whenTies } from './src-times/whenTies.js'
import { whenGolHappens } from './src-times/whenGolHappens.js'
import { winningLosing } from './src-times/winningLosing.js'
import { inicialSituation } from './src-times/inicialSituation.js'
import { totalTempo } from './src-tabelas/totalTempo.js'
import { totalResultado } from './src-tabelas/totalResultado.js'
import { getPartidasTime, qtdRodadas } from './utils.js'

export const router=Router()

router.post('/times/:time',async(req,res)=>{
    const {time}=req.params
    const {type}=req.query
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const who=parseInt(req.query.who)
    const partidas=getPartidasTime(bancoFake,time)
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

const escolhas={}
escolhas['ingles']=0
escolhas['espanhol']=0
escolhas['italiano']=0
escolhas['alemao']=0
escolhas['frances']=0
router.post('/escolha',async(req,res)=>{
    
    const {escolha}=req.body
    let status=200
    if(escolhas[escolha]||escolhas[escolha]==0){
        status=201
        escolhas[escolha]=escolhas[escolha]+1
    }
    res.status(status).send(formatResponse())
})
router.get('/escolha',async(req,res)=>{
    res.status(200).send(formatResponse())
})
router.put('/escolha',async(req,res)=>{
    const {mais,menos}=req.body
    let status=200
    if((escolhas[mais]||escolhas[mais]==0)&&(escolhas[menos]||escolhas[menos]==0)){
        status=201
        escolhas[mais]=escolhas[mais]+1
        escolhas[menos]=escolhas[menos]-1
        console.log(escolhas)
    }
    res.status(status).send(formatResponse())
})
function formatResponse(){
    const {ingles,espanhol,italiano,alemao,frances}=escolhas
    const total=ingles+espanhol+italiano+alemao+frances
    const response=[
        {name:'Inglês',perc:Math.round(100*ingles/total)||0},
        {name:'Espanhol',perc:Math.round(100*espanhol/total)||0},
        {name:'Italiano',perc:Math.round(100*italiano/total)||0},
        {name:'Alemão',perc:Math.round(100*alemao/total)||0},
        {name:'Francês',perc:Math.round(100*frances/total)||0}
    ]
    return response
}