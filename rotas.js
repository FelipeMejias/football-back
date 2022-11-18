import Router from 'express'
import { bancoBra1, bancoIng1, bancoWc } from "./index.js"
import { firstGoal } from './src-times/firstGoal.js'
import { whenTies } from './src-times/whenTies.js'
import { whenGolHappens } from './src-times/whenGolHappens.js'
import { winningLosing } from './src-times/winningLosing.js'
import { inicialSituation } from './src-times/inicialSituation.js'
import { totalTempo } from './src-tabelas/totalTempo.js'
import { totalResultado } from './src-tabelas/totalResultado.js'
import { desempacotar, getPartidasTime } from './utils.js'

export const router=Router()

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

router.get('/partidas/:camp/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    const {camp}=req.params
    let partida
    const {partidasTotais}=buildContext(camp,[true,true,true,true,true])
    for (let part of partidasTotais){
        if(part.id==id){
            partida=part
            break;
        }
    }
    res.status(200).send(partida)
})

function buildContext(camp,copaType){
    if(camp=='bra1')return {
        qtdRodadas:36,
        partidasTotais:bancoBra1,
        listaTimes:['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
    }
    if(camp=='ing1')return {
        qtdRodadas:17,
        partidasTotais:bancoIng1,
        listaTimes:['ars','ast','bou','bre','bri','che','cry','eve','ful','lee','lei','liv','mau','mac','new','not','sou','tot','wes','wol']
    }
    if(camp=='wc')return {
        qtdRodadas:24,
        partidasTotais:bancoWc.filter(part=>{
            const {torneio}=part
            return(
                (copaType[0]||torneio!='c22')&&
                (copaType[1]||torneio!='eli')&&
                (copaType[2]||torneio!='tor')&&
                (copaType[3]||torneio!='ami')&&
                (copaType[4]||torneio!='c18')
            )}),
        listaTimes:['cat','equ','sen','hol','ing','ira','eua','gal','arg','ara','mex','pol','din','tun','fra','aus','ale','jap','esp','crc','mar','cro','bel','can','sui','cam','bra','ser','uru','cor','por','gan']
    }
}

