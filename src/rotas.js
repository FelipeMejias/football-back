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
import dayjs from 'dayjs'
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
    let din=0;let ganho=0;let red=0;let green=0;
    for(let ap of apostas){
        if(ap.green===null||ap.green===undefined){
            
        }else{
            din++
            if(ap.green)ganho+=ap.odd
            if(ap.green){green++}else{red++}
        }
        
    }
    const rodadas=porRodada(camps,tipos,ev)
    const respRodadas=[]
    for(let k=rodadas.length-1;k>=0;k--){
        let din2=0;let ganho2=0;let red2=0;let green2=0;let abertas=0
        for(let ap of rodadas[k]){
            if(ap.green===null||ap.green===undefined){
                if(ap.green===undefined)abertas++
            }else{
                din2++
            if(ap.green)ganho2+=ap.odd
            if(ap.green){green2++}else{red2++}
            }
            
        }
        const porc2=Math.round((green2/din2)*100)
        const lucroRaw2=ganho2/din2
        const lucroMedium2=Math.round((lucroRaw2%1)*100)
        const lucro2=lucroRaw2>1?lucroMedium2:-(100-lucroMedium2)
        respRodadas.push({numero:k+1,abertas,porc:porc2,green:green2,red:red2,lucro:lucro2,apostas:rodadas[k]})
    }
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=Math.round((lucroRaw%1)*100)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium)
    res.status(200).send({rodadas:respRodadas,porc,green,red,lucro,apostas})
})
function porRodada(camps,tipos,ev){
    const resp=[]
    let data='240213'
    let aindaFalta=true
    const agora=traduzirData(dayjs())
    while(aindaFalta){
        const dataInicio=data
        data=avanca7dias(data)
        const apostas=buildApostas(2,dataInicio,data).filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
        if(apostas)resp.push(apostas)
        if(dataInicio>agora){
            aindaFalta=false
        }
    }
    return resp
}
function avanca7dias(time){
    const ano='20'+time[0]+time[1]
    const mes=time[2]+time[3]
    const dia=time[4]+time[5]
    const hora='00'
    const minuto='00'
    const date=dayjs(`${ano}-${mes}-${dia} ${hora}:${minuto}`)
    const respRaw=date.add(7,'day')
    const resp=traduzirData(respRaw)
    return resp
}
function traduzirData(re){
    const year=re['$y']
    const month=re['$M']+1
    const day=re['$D']
    const resp=`${year%1000}${month<10?'0':''}${month}${day<10?'0':''}${day}`
    return resp
}