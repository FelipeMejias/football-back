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
    banco[0].forEach(part=>{
        if(part[0]==mandante+visitante){
            data=part[1]
        }
    })
    const resp=criarOrdemDupla(context,mandante,visitante)
    res.status(200).send({resp,data})
})
router.get('/analise/:camp/:mandante/:visitante',async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const {grandeza,c,asc,metade,valor}=req.query
    const context=buildContext(camp)
    const resp=analisar(context,mandante,visitante,parseInt(grandeza),parseInt(c),grandeza==1?0:parseInt(asc),parseInt(metade),parseFloat(valor))
    res.status(200).send(resp)
})

