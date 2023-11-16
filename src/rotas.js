import Router from 'express'
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
router.get('/partidas/:camp/:partida',async(req,res)=>{
    const id=parseInt(req.params.partida)
    const {camp}=req.params
    const {partidasTotais}=buildContext(camp,true)
    res.status(200).send(getPartida(partidasTotais,id))
})


router.get('/times/:camp/:time',async(req,res)=>{
    const {time,camp}=req.params
    const context=buildContext(camp)
    const banco=buildContext(camp,true)
    const resposta=criarOrdem(context,time)
    const stats=ordenarIndividual(resposta)
    const partidas=partidasTime(banco,time)
    const resp={stats,partidas}
    res.status(200).send(resp)
})
router.get('/guru/:camp/:mandante/:visitante',async(req,res)=>{
    const {camp,mandante,visitante}=req.params
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
    res.status(200).send({resp,data})
})

/*
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
*/



