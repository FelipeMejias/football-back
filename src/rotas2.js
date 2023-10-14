import Router from 'express'
import {  ordenarIndividual, quantoTempoFalta } from './utils.js'
import { buildContext, buildFuturaResponse } from './bancos.js'
import { classificacao } from './tabelas/classificacao.js'
import { partidasRodada } from './tabelas/partidasRodada.js'
import { criarOrdem } from './profundo/individual2.js'
import { criarOrdemDupla, criarOrdemDuplaFavoritos } from './profundo/dupla.js'
import { partidasTime } from './profundo/partidasTime.js'
import { ultimoGol } from './tabelas2/ultimoGol.js'
import { primeiroGol } from './tabelas2/primeiroGol.js'
import { placar } from './tabelas2/placar.js'
import { mediaGols } from './tabelas2/mediaGols.js'
import { comparar } from './tabelas2/comparar.js'
import { escanteios } from './tabelas2/escanteios.js'
import { marcaPrimeiro } from './tabelas2/marcaPrimeiro.js'

export const router=Router()


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
    const resp=classificacao(context,rodada,camp)
    const resposta={
        rodadaAtual:fal?context.qtdRodadas:null,
        listaTabela:{
            classif:resp,
            partidas
        }
    }
    res.status(200).send(resposta)
})




router.get('/primeirogol/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    const resp= primeiroGol(context,estadia,metade)
    res.status(200).send(resp)
})
router.get('/ultimogol/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    const resp= ultimoGol(context,estadia,metade)
    res.status(200).send(resp)
})

router.get('/comparar/:camp',async(req,res)=>{
    const handicap=parseInt(req.query.handicap)
    const {camp}=req.params
    const context=buildContext(camp)
    const resp= comparar(context,handicap)
    res.status(200).send(resp)
})

router.get('/placar/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    
    const resp= placar(context,estadia,metade)
    res.status(200).send(resp)
})
router.get('/mediagols/:camp',async(req,res)=>{
    const metade=parseInt(req.query.metade)
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    
    const resp= mediaGols(context,estadia,metade)
    res.status(200).send(resp)
})
router.get('/escanteios/:camp',async(req,res)=>{
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    
    const resp= escanteios(context,estadia)
    res.status(200).send(resp)
})
router.get('/marcaprimeiro/:camp',async(req,res)=>{
    const estadia=parseInt(req.query.estadia)
    const {camp}=req.params
    const context=buildContext(camp)
    
    const resp= marcaPrimeiro(context,estadia)
    res.status(200).send(resp)
})
router.get('/partidasgerais',async(req,res)=>{
    const lista=buildFuturaResponse()
    res.status(200).send(lista)
})
router.get('/partidas/:camp/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    const {camp}=req.params
    const {partidasTotais}=buildContext(camp,true)
    res.status(200).send(getPartida(partidasTotais,id))
})


router.get('/times/:camp/:time',async(req,res)=>{
    const {time,camp}=req.params
    const context=buildContext(camp)
    const resposta=criarOrdem(context,time)
    const stats=ordenarIndividual(resposta)
    const partidas=partidasTime(context,time)
    res.status(200).send({stats,partidas})
})
router.get('/guru/:camp/:mandante/:visitante',async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const context=buildContext(camp)
    const resp=criarOrdemDupla(context,mandante,visitante)
    res.status(200).send(resp)
})


router.get('/favoritos',async(req,res)=>{
    const lista=buildFuturaResponse(true)
    const newo=[]
    lista.forEach(element => {
        const {mandante,visitante,camp,id,texto}=element
        const contexto=buildContext(camp)
        const minilist=criarOrdemDuplaFavoritos(contexto,mandante,visitante)
        const objeto={
            mandante,visitante,minilist,camp,id,texto
        }
        if(minilist.length>0)newo.push(objeto)
    });
    const resp=newo.sort((a,b)=>{
        if(a.minilist[0][2].odd>b.minilist[0][2].odd){
            return -1
        }else{return true}
    })
    res.status(200).send(resp)
})



function getPartida(banco,id){
    for(let part of banco){
        if(part.id==id){
            return part
        }
    }
}


