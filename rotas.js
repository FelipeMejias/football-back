import Router from 'express'
import { bancoAfrica, bancoAmericaNorte, bancoAmericaSul, bancoAsia, bancoBra1, bancoEuropa } from "./index.js"
import { firstGoal } from './src-times/firstGoal.js'
import { whenTies } from './src-times/whenTies.js'
import { whenGolHappens } from './src-times/whenGolHappens.js'
import { winningLosing } from './src-times/winningLosing.js'
import { inicialSituation } from './src-times/inicialSituation.js'
import { totalTempo } from './src-tabelas/totalTempo.js'
import { totalResultado } from './src-tabelas/totalResultado.js'
import { getPartidasTime } from './utils.js'

export const router=Router()

router.post('/times/:camp/:time',async(req,res)=>{
    const {time,camp}=req.params
    const {type}=req.query
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const who=parseInt(req.query.who)
    const {partidasTotais,qtdRodadas}=buildContext(camp,time)
    const partidas=getPartidasTime(partidasTotais,time)
    let resp
    if(type==='1'){
        resp= firstGoal(partidas,ignorados||[],rodadas,time,who)
    }else if(type==='2'){
        resp= whenTies(partidas,ignorados||[],rodadas,time,who)
    }else if(type==='3'){
        resp= whenGolHappens(partidas,ignorados||[],rodadas,time,who)
    }else if(type==='4'){
        resp= winningLosing(partidas,ignorados||[],rodadas,time,who)
    }else if(type==='9'){
        resp= winningLosing(partidas,ignorados||[],rodadas,time,null,true)
    }else if(type==='10'){
        resp= inicialSituation(partidas,ignorados||[],rodadas,time)
    }
    res.status(200).send({
        ...resp,
        qtdRodadas
    })
})

router.post('/tempos/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {ignorados}=req.body
    const {camp}=req.params
    const {elimin}=req.query
    const context=buildContext(camp,elimin)
    const resp= totalTempo(context,ignorados||[],rodadas,estadia,metade)
    res.status(200).send({
        qtdRodadas:context.qtdRodadas,
        listaTabela:resp
    })
})

router.post('/totais/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const rodadas=parseInt(req.query.rodadas)
    const {elimin}=req.query
    const {ignorados}=req.body
    const {camp}=req.params
    const context=buildContext(camp,elimin)
    const resp= totalResultado(context,ignorados||[],rodadas,estadia,metade)
    res.status(200).send({
        qtdRodadas:context.qtdRodadas,
        listaTabela:resp
    })
})

router.get('/partidas/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    let partida
    for (let part of bancoBra1){
        if(part.id==id){
            partida=part
            break;
        }
    }
    res.status(200).send(partida)
})

const americaNorte=['eua','mex','crc','can']
const americaSul=['equ','arg','bra','uru']
const europa=['ser','hol','ing','gal','pol','din','ale','fra','esp','cro','bel','por','sui']
const africa=['sen','tun','mar','cam','gan']
const asia=['ira','ara','jap','cor','aus']


function buildContext(camp,dif){
    if(camp=='bra1')return {qtdRodadas:36,partidasTotais:bancoBra1,listaTimes:['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']}
    if(camp=='wc'){
        if(!dif||dif==='cat')return {qtdRodadas:2,partidasTotais:[...bancoAmericaNorte,...bancoAmericaSul,...bancoEuropa,...bancoAfrica,...bancoAsia,...bancoOceania],listaTimes:['cat','equ','sen','hol','ing','ira','eua','gal','arg','ara','mex','pol','din','tun','fra','aus','ale','jap','esp','crc','mar','cro','bel','can','sui','cam','bra','ser','uru','cor','por','gan']}
        if(dif==='amn'||americaNorte.includes(dif))return{qtdRodadas:0,partidasTotais:bancoAmericaNorte,listaTimes:americaNorte}
        if(dif==='ams'||americaSul.includes(dif))return{qtdRodadas:2,partidasTotais:bancoAmericaSul,listaTimes:americaSul}
        if(dif==='eur'||europa.includes(dif))return{qtdRodadas:0,partidasTotais:bancoEuropa,listaTimes:europa}
        if(dif==='afr'||africa.includes(dif))return{qtdRodadas:0,partidasTotais:bancoAfrica,listaTimes:africa}
        if(dif==='asi'||asia.includes(dif))return{qtdRodadas:0,partidasTotais:bancoAsia,listaTimes:asia}
    }
}

const guest='cat'
