import Router from 'express'
import bcrypt from "bcrypt";
import { buildContext } from './bancos.js'
import { criarOrdem } from './especiais/individual.js'
import { criarOrdemDupla } from './especiais/dupla.js'
import { partidasTime } from './mu/tabelas/partidasTime.js'
import { ultimoGol } from './mu/tabelas/ultimoGol.js'
import { primeiroGol } from './mu/tabelas/primeiroGol.js'
import { placar } from './mu/tabelas/placar.js'
import { mediaGols } from './mu/tabelas/mediaGols.js'
import { comparar } from './mu/tabelas/comparar.js'
import { escanteios } from './mu/tabelas/escanteios.js'
import { marcaPrimeiro } from './mu/tabelas/marcaPrimeiro.js'
import { buildFutura } from './especiais/buildFutura.js'
import { analisar } from './especiais/analise.js'
import { create, getPartida } from './especiais/getPartida.js'
import { classificacao } from './mu/tabelas/classificacao.js'
import { partidasLiga } from './mu/tabelas/partidasLiga.js'
import { listaAnalise } from './especiais/listaAnalise.js'
import { buildApostas } from './especiais/buildApostas.js'
import { buildResultado } from './especiais/resultado.js'
import { colocarLabels, dataParaTopo, quantoTempoFalta } from './mu/utils.js'
import { preencher, preencherPartidas } from './mu/2-online/preencher.js'
import { validateCamp } from './mu/1-validators/campValidator.js'
import { validateTime } from './mu/1-validators/timeValidator.js'
import { validatePost } from './mu/1-validators/postValidator.js'
import { marcaUltimo } from './mu/tabelas/marcaUltimo.js'
import { resultadoSemanas } from './especiais/resultadoSemanas.js'
import { preFlop } from './especiais/preflop.js'
import { acharUsuario, cadastrar, login, torneiosUsuario } from './mu/2-online/bancoTorneios.js'
import { bancoUsuarios } from './mu/2-online/1_____usuarios.js';
import { criarOrdemDuplaPreflop } from './especiais/duplaPreFlop.js';

export const router=Router()

router.get('/tabelas/:camp/:pagestr',validateCamp,async(req,res)=>{
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
    }else if(page==8){
        resp= marcaUltimo(context,parseInt(estadia))
    }
    res.status(200).send(resp)
})
router.get('/partidasgerais',async(req,res)=>{
    const {camps:campsRaw}=req.query
    const camps=campsRaw.split('-')
    const lista=buildFutura(camps)
    const resp=lista.length>0?colocarLabels(lista):[]
    console.log('oi')
    res.status(200).send(resp)
})
router.get('/apostasgerais/:aberto',async(req,res)=>{
    const {aberto}=req.params
    const lista=buildApostas(parseInt(aberto))
    res.status(200).send(lista)
})
router.get('/partida/:camp/:manvis',validateCamp,validateTime('manvis'),async(req,res)=>{
    const {camp,manvis}=req.params
    const {partidasTotais}=buildContext(camp)
    const partida=getPartida(partidasTotais,manvis)
    if(!partida)res.status(500).send({})
    const resp=create(partida,camp)
    res.status(200).send(resp)
})
router.get('/times/:camp/:time',validateCamp,validateTime('time'),async(req,res)=>{
    const {time,camp}=req.params
    const context=buildContext(camp)
    const stats=criarOrdem(context,time)
    const contextMaior=buildContext(camp,true)
    const partidas=partidasTime(contextMaior,time)
    const resp={stats,partidas}
    res.status(200).send(resp)
})
router.get('/guru/:camp/:mandante/:visitante',validateCamp,validateTime('mandante','visitante'),async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const resp=criarOrdemDuplaPreflop(camp,mandante,visitante)
    const novaResp=criarOrdemDupla(camp,mandante,visitante)
    const data=dataParaTopo(camp,mandante,visitante)
    res.status(200).send({resp,data})
})
router.get('/preflop/:camp/:mandante/:visitante',validateCamp,validateTime('mandante','visitante'),async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const resp=preFlop(camp,mandante,visitante)
    res.status(200).send(resp)
})
//reconect
router.get('/analise/:camp/:mandante/:visitante',validateCamp,validateTime('mandante','visitante'),async(req,res)=>{
    const {camp,mandante,visitante}=req.params
    const {grandeza,c,asc,metade,valor}=req.query
    const resp=analisar(camp,mandante,visitante,parseInt(grandeza),parseInt(c),parseInt(asc),parseInt(metade),valor?parseFloat(valor):false)
    const data=dataParaTopo(camp,mandante,visitante)
    res.status(200).send({resp,data})
})
router.get('/lista-analise/:camp/:time/:manvis',validateCamp,validateTime('manvis','time'),async(req,res)=>{
    const {camp,time,manvis}=req.params
    const {grandeza,c,asc,metade,valor,estadia}=req.query
    const context=buildContext(camp)
    const resp=listaAnalise(context,parseInt(grandeza),parseInt(estadia),parseInt(metade),time,parseInt(c),parseInt(asc),parseFloat(valor))
    res.status(200).send(resp)
})
router.get('/classificacao/:camp',validateCamp,async(req,res)=>{
    const {camp}=req.params
    const {partidasTotais,listaTimes}=buildContext(camp)
    const {partidasTotais:comFuturas}=buildContext(camp,true)
    const classif=classificacao(camp,partidasTotais,listaTimes)
    const parts=partidasLiga(comFuturas)
    const resp={classif,parts}
    res.status(200).send(resp)
})
router.get('/resultados',async(req,res)=>{
    const {camps:campsRaw,tipos:tiposRaw,ev:evRaw,contagem}=req.query
    const tipos=tiposRaw.split('-')
    const camps=campsRaw.split('-')
    const ev=parseInt(evRaw)
    const resp=buildResultado(camps,tipos,ev)
    res.status(200).send({resp,cont:parseInt(contagem)})
})
router.get('/resultadosSemanas',async(req,res)=>{
    const {camps:campsRaw,tipos:tiposRaw,ev:evRaw}=req.query
    const tipos=tiposRaw.split('-')
    const camps=campsRaw.split('-')
    const ev=parseInt(evRaw)
    const resp=resultadoSemanas(camps,tipos,ev)
    res.status(200).send(resp)
})

//================
//CONTROLE EXTERNO


router.post('/preencher/:camp/:mandante/:visitante',validateCamp,validateTime('mandante','visitante'),async(req,res)=>{
    const {partida}=req.body
    const {camp,mandante,visitante}=req.params
    const part=preencher(camp,mandante,visitante,partida)
    res.status(200).send(part)
})

router.post('/preencherParts/:camp',validateCamp,async(req,res)=>{
    const {lista}=req.body
    const {camp}=req.params
    const foi=preencherPartidas(camp,lista)
    res.sendStatus(foi?200:500)
})

//=================
//POSTS AUTOMATICOS

router.get('/apostascriar/:camp/:manvis',validateCamp,validateTime('manvis'),async(req,res)=>{
    const {camp,manvis}=req.params
    const todas=buildApostas(2)
    const resp=todas.filter(apo=>(
        apo.camp==camp&&
        apo.mandante==manvis[0]+manvis[1]+manvis[2]&&
        apo.visitante==manvis[3]+manvis[4]+manvis[5]
    ))
    res.status(200).send(resp)
})
router.get('/infoscriar/:camp/:manvis/:infovalor',validateCamp,validateTime('manvis'),async(req,res)=>{
    const {camp,manvis,infovalor}=req.params
    const lis=infovalor.split('-')
    const info=lis[0]
    const valor=lis[1]
    const mandante=manvis[0]+manvis[1]+manvis[2]
    const visitante=manvis[3]+manvis[4]+manvis[5]
    const {partidasTotais}=buildContext(camp,true)
    const partida= getPartida(partidasTotais,mandante+visitante)
    const data=partida[1]
    let texto=quantoTempoFalta(data)
                if(texto.includes('-')){
                    const lis=texto.split('-')
                    texto=lis
                }
    const guruRaw=criarOrdemDupla(camp,mandante,visitante)
    const guruCerto=guruRaw.filter(cada=>{
        const {grandeza,c,asc,metade}=cada[0]
        const codigo=`${grandeza}${c}${asc}${metade}`
        return(cada.length==3&&codigo==info)
    })
    const guru=guruCerto[0]
    const analise=analisar(camp,mandante,visitante,parseInt(info[0]),parseInt(info[1]),parseInt(info[2]),parseInt(info[3]),parseFloat(valor))
    res.status(200).send({guru,analise,data:texto})
})
router.get('/postresultadocamp/:camp',validateCamp,async(req,res)=>{
    const {camp}=req.params
    const {partidasTotais}=buildContext(camp)
    const resp=[]
    for(let k=0;k<20;k++){
        const partida=partidasTotais[k]
        const manvis=partida[0]
        const mandante=manvis[0]+manvis[1]+manvis[2]
        const visitante=manvis[3]+manvis[4]+manvis[5]
        resp.push({mandante,visitante})
    }
    res.status(200).send(resp)
})

//=================
//TORNEIOS

router.post('/cadastro',async (req,res)=>{
    const {usuario,senha}=req.body
    if( usuario && senha ){
        try{
            const user = acharUsuario(usuario)
            if(user){
                console.log('erro cadastro: usuario ja existe')
                res.sendStatus(422)
            }
            const senhaCript = bcrypt.hashSync(senha, 10);
            const objUsu=cadastrar(usuario,senhaCript)
            res.status(200).send(objUsu)
        } catch (e) {
            console.log(e)
            console.log('erro cadastro')
            res.sendStatus(500)
        }
        
    }else{
        console.log('erro cadastro: nome ou email ou senha ou icone nao foram enviados')
        res.sendStatus(500)
    }
})
router.post('/login',async (req,res)=>{
    const {usuario,senha}=req.body
    try {
        const user = acharUsuario(usuario)
        if(user && bcrypt.compareSync(senha, user.senhaCript)){
            const {nome,id}=user
            res.status(200).send({nome,id})
        }else{
            console.log('erro login: usuario nao existe ou senha está incorreta')
            res.sendStatus(422)
        }
    } catch (e) {
        console.log('erro login')
        res.sendStatus(500)
    }
})
router.get('/usuarios',async(req,res)=>{
    res.status(200).send(bancoUsuarios)
})

router.get('/torneios/:idStr',async(req,res)=>{
    const {idStr}=req.params
    const id=parseInt(idStr)
    const resp=torneiosUsuario(id)
    res.status(200).send(resp)
})
router.get('/podeconvidar/:usuario',async(req,res)=>{
    const {usuario}=req.params
    try {
        const user = acharUsuario(usuario)
        if(user){
            res.status(200).send(user)
        }else{
            console.log('erro convidar: usuario nao existe')
            res.sendStatus(422)
        }
    } catch (e) {
        console.log('erro convidar')
        res.sendStatus(500)
    }
})