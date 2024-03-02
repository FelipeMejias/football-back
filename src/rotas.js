import Router from 'express'
import { ordenarIndividual } from './utils.js'
import { buildContext } from './bancos.js'
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
import { buildFutura } from './especiais/buildFutura.js'
import { analisar } from './especiais/analise.js'
import { create, getPartida } from './especiais/getPartida.js'
import { classificacao } from './especiais/classificacao.js'
import { partidasLiga } from './especiais/partidasLiga.js'
import { listaAnalise } from './especiais/listaAnalise.js'
import { buildApostas } from './especiais/buildApostas.js'
//import { buildApostas } from './especiais/buildAposta.js'

export const router=Router()

router.get('/tabelas/:camp/:pagestr',async(req,res)=>{
    const {camp,pagestr}=req.params
    const page=parseInt(pagestr)
    const context=buildContext(camp)
    const {estadia,metade,handicap}=req.query
    let resp
    if(page==1){
        resp= placar(context,parseInt(estadia),parseInt(metade))
    }else if(page==2){
        resp= mediaGols(context,parseInt(estadia),parseInt(metade))
    }else if(page==3){
        resp= primeiroGol(context,parseInt(estadia))
    }else if(page==4){
        resp= ultimoGol(context,parseInt(estadia))
    }else if(page==5){
        resp= comparar(context,parseInt(handicap))
    }else if(page==6){
        resp= escanteios(context,parseInt(estadia))
    }else if(page==7){
        resp= marcaPrimeiro(context,parseInt(estadia))
    }
    res.status(200).send(resp)
})
router.get('/partidasgerais',async(req,res)=>{
    const lista=buildFutura()
    res.status(200).send(lista)
})
router.get('/apostasgerais/:aberto',async(req,res)=>{
    const {aberto}=req.params
    const lista=buildApostas(parseInt(aberto))

    res.status(200).send(lista)
})
router.get('/partida/:camp/:manvis',async(req,res)=>{
    const {camp,manvis}=req.params
    const {partidasTotais}=buildContext(camp)
    const partida=getPartida(partidasTotais,manvis)
    const resp=create(partida,camp)
    res.status(200).send(resp)
})
router.get('/times/:camp/:time',async(req,res)=>{
    const {time,camp}=req.params
    const context=buildContext(camp)
    const resposta=criarOrdem(context,time)
    const stats=ordenarIndividual(resposta)
    const partidas=partidasTime(context,time)
    const resp={stats,partidas}
    res.status(200).send(resp)
})
router.get('/guru/:camp/:mandante/:visitante',async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const {partidasTotais}=buildContext(camp,true)
    const partida= getPartida(partidasTotais,mandante+visitante)
    const data=partida[1]
    const resp=criarOrdemDupla(camp,mandante,visitante)
    res.status(200).send({resp,data})
})
router.get('/analise/:camp/:mandante/:visitante',async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const {grandeza,c,asc,metade,valor}=req.query
    const resp=analisar(camp,mandante,visitante,parseInt(grandeza),parseInt(c),grandeza==1?0:parseInt(asc),parseInt(metade),parseFloat(valor))
    res.status(200).send(resp)
})
router.get('/lista-analise/:camp/:time/:manvis',async(req,res)=>{
    const {camp,time,manvis}=req.params
    const {grandeza,c,asc,metade,valor,estadia}=req.query
    const context=buildContext(camp,manvis)
    const resp=listaAnalise(context,parseInt(grandeza),parseInt(estadia),parseInt(metade),time,parseInt(c),parseInt(asc),parseFloat(valor))
    res.status(200).send(resp)
})
router.get('/classificacao/:camp',async(req,res)=>{
    const {camp}=req.params
    const {partidasTotais,listaTimes}=buildContext(camp)
    const classif=classificacao(camp,partidasTotais,listaTimes)
    const parts=partidasLiga(partidasTotais)
    const resp={classif,parts}
    res.status(200).send(resp)
})
router.get('/resultados',async(req,res)=>{
    const {camps:campsRaw,tipos:tiposRaw,ev:evRaw}=req.query
    const camps=campsRaw.split('-')
    const tipos=tiposRaw.split('-')
    const ev=parseInt(evRaw)
    const apostasRaw=buildApostas(3).filter(a=>a.green!==null)
    const apostas=apostasRaw.filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
    let din=0;let ganho=0;let red=0;let green=0
    for(let ap of apostas){
        din++
        if(ap.green)ganho+=ap.odd
        if(ap.green){green++}else{red++}
    }
    const futurasRaw=buildApostas(1)
    const futuras=futurasRaw.filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=Math.round((lucroRaw%1)*100)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium)
    res.status(200).send({porc,green,red,lucro,apostas:[apostas,futuras]})
})