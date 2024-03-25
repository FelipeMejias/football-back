import { buildContext, ligas } from "../bancos.js"
import { buscarApostasJogo } from "../profundo/apostas.js"
import { confGols } from "../conferencias/confGols.js"
import { confEsc } from "../conferencias/confEsc.js"
import { confPlacar } from "../conferencias/confPlacar.js"
import { quantoTempoFalta } from "../utils.js"
import { confPrimGol } from "../conferencias/confPrimGol.js"
import { confUltimoGol } from "../conferencias/confUltimoGol.js"
const peso_n=0.4
const peso_q=0.3
const peso_q2=0.3
const qtd=7
const qtd2=3

const cPlus=['ing1','ita1','ale1',]

const plus={
    peso_N:0.6,
    peso_QsemE:0.20,
    peso_Q2:0.20,
    qTDsemE:5,
    qTD2:7,
}
const noPlus={
    peso_N:0.6,
    peso_Q2:0.15,
    peso_QsemE:0.25,
    qTD2:3,
    qTDsemE:10,
}

const PESO_N=0.5
const PESO_Q2=0.25
const PESO_Q=0.25
const QTD2=7
const QTD=15


export function buildApostas(pageBet,dataInicio=false,dataFim=false){
    let desordenada=[]
    let ordenada
    const {paths}=ligas
    if(pageBet==1){
        paths.forEach(camp=>{desordenada=[...desordenada,...extrairFuturas(camp)]})
        ordenada= desordenada.sort((a,b)=>{if(a.data<b.data){return -1}else{return true}})
    }else if(pageBet==3){
        paths.forEach(camp=>{desordenada=[...desordenada,...extrairPassadas(camp)]})
        ordenada= desordenada.sort((a,b)=>{if(a.data>b.data){return -1}else{return true}})
    }else{
        paths.forEach(camp=>{desordenada=[...desordenada,...extrairFuturas(camp)]})
        const lista1= desordenada.sort((a,b)=>{if(a.data<b.data){return -1}else{return true}})
        let lista2Desord=[]
        paths.forEach(camp=>{lista2Desord=[...lista2Desord,...extrairPassadas(camp)]})
        const lista2= lista2Desord.sort((a,b)=>{if(a.data>b.data){return -1}else{return true}})
        ordenada=[...lista1,...lista2]
        if(dataInicio)ordenada=ordenada.filter(j=>j.data>dataInicio&&j.data<dataFim)
    }
    const resp=[]
    
    for(let partida of ordenada){
        const {camp,mandante,visitante,cinza}=partida
        const apostas=buscarApostasJogo(camp,mandante,visitante)
        const context=buildContext(camp,mandante+visitante)
        for(let ap of apostas){let caQ;let foQ;let caQ2;let foQ2;
            let ca;let fo;let tex;let ode;let valor
            const {info,odd,texto,green}=ap
            let chance
            const grandeza=parseInt(info[0])
            const c=parseInt(info[1])
            const asc=parseInt(info[2])
            const metade=parseInt(info[3])
            if(grandeza!=1){
                for(let esp of odd){
                    const {o,q,green}=esp
                    if(grandeza==2){
                        ca=confGols(100,context,1,metade,mandante,c,asc,q)
                        fo=confGols(100,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ=confGols((cPlus.includes(camp)?plus:noPlus).qTDsemE,context,0,metade,mandante,c,asc,q)
                        foQ=confGols((cPlus.includes(camp)?plus:noPlus).qTDsemE,context,0,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ2=confGols((cPlus.includes(camp)?plus:noPlus).qTD2,context,1,metade,mandante,c,asc,q)
                        foQ2=confGols((cPlus.includes(camp)?plus:noPlus).qTD2,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        chance=((ca+fo)/2)*(cPlus.includes(camp)?plus:noPlus).peso_N+((caQ+foQ)/2)*(cPlus.includes(camp)?plus:noPlus).peso_QsemE+((caQ2+foQ2)/2)*(cPlus.includes(camp)?plus:noPlus).peso_Q2
                    }else if(grandeza==7){
                        ca=confPrimGol(100,context,1,metade,mandante,c,asc,q)
                        fo=confPrimGol(100,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ=confPrimGol((cPlus.includes(camp)?plus:noPlus).qTDsemE,context,0,metade,mandante,c,asc,q)
                        foQ=confPrimGol((cPlus.includes(camp)?plus:noPlus).qTDsemE,context,0,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ2=confPrimGol((cPlus.includes(camp)?plus:noPlus).qTD2,context,1,metade,mandante,c,asc,q)
                        foQ2=confPrimGol((cPlus.includes(camp)?plus:noPlus).qTD2,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        chance=((ca+fo)/2)*(cPlus.includes(camp)?plus:noPlus).peso_N+((caQ+foQ)/2)*(cPlus.includes(camp)?plus:noPlus).peso_QsemE+((caQ2+foQ2)/2)*(cPlus.includes(camp)?plus:noPlus).peso_Q2
                    }else if(grandeza==8){
                        ca=confUltimoGol(100,context,1,metade,mandante,c,asc,q)
                        fo=confUltimoGol(100,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ=confUltimoGol((cPlus.includes(camp)?plus:noPlus).qTDsemE,context,0,metade,mandante,c,asc,q)
                        foQ=confUltimoGol((cPlus.includes(camp)?plus:noPlus).qTDsemE,context,0,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ2=confUltimoGol((cPlus.includes(camp)?plus:noPlus).qTD2,context,1,metade,mandante,c,asc,q)
                        foQ2=confUltimoGol((cPlus.includes(camp)?plus:noPlus).qTD2,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        chance=((ca+fo)/2)*(cPlus.includes(camp)?plus:noPlus).peso_N+((caQ+foQ)/2)*(cPlus.includes(camp)?plus:noPlus).peso_QsemE+((caQ2+foQ2)/2)*(cPlus.includes(camp)?plus:noPlus).peso_Q2
                    }else{
                        ca=confEsc(100,context,1,metade,mandante,c,asc,q)
                        fo=confEsc(100,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ=confEsc(qtd,context,1,metade,mandante,c,asc,q)
                        foQ=confEsc(qtd,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        caQ2=confEsc(qtd2,context,1,metade,mandante,c,asc,q)
                        foQ2=confEsc(qtd2,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        chance=((ca+fo)/2)*peso_n+((caQ+foQ)/2)*peso_q+((caQ2+foQ2)/2)*peso_q2
                    }
                    tex=texto.replace('X',q)
                    ode=parseFloat(o)
                    valor=q
                    
                    resp.push({
                        ev:calcularEV(chance,ode),
                        chance:chance==100?99:chance,
                        texto:tex,
                        odd:ode,
                        camp,mandante,visitante,
                        green:cinza?null:green,
                        info,
                        valor,
                        nome:`${camp+mandante+visitante}${info}${valor}`
                    }) 
                }
            }else{
                ca=confPlacar(100,context,1,metade,mandante,c,asc,null)
                fo=confPlacar(100,context,2,metade,visitante,c==1?3:c==2?2:1,asc,null)
                caQ=confPlacar(QTD,context,0,metade,mandante,c,asc,null)
                foQ=confPlacar(QTD,context,0,metade,visitante,c==1?3:c==2?2:1,asc,null)
                caQ2=confPlacar(QTD2,context,1,metade,mandante,c,asc,null)
                foQ2=confPlacar(QTD2,context,2,metade,visitante,c==1?3:c==2?2:1,asc,null)
                tex=texto
                ode=parseFloat(odd)
                chance=((ca+fo)/2)*PESO_N+((caQ+foQ)/2)*PESO_Q+((caQ2+foQ2)/2)*PESO_Q2

                resp.push({
                    ev:calcularEV(chance,ode),
                    chance:chance==100?99:chance,
                    texto:tex,
                    odd:ode,
                    camp,mandante,visitante,
                    green:cinza?null:green,
                    info,
                    valor,
                    nome:`${camp+mandante+visitante}${info}`
                }) 
            }
        }
    }
    return resp
}
function extrairFuturas(camp){
    const {partidasTotais}=buildContext(camp,true)
    const resp=[]
    for(let k=0;k<partidasTotais.length;k++){
        const part=partidasTotais[k]
        if(part[1].length!=2){
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            const data=part[1]
            const texto=quantoTempoFalta(data)
            if(texto!='Finalizado')resp.push({
                mandante,visitante,data,camp
            })
        }else{
            return resp
        }
    }
    return resp
}
function extrairPassadas(camp){
    const {partidasTotais}=buildContext(camp,true)
    const resp=[]
    for(let k=0;k<partidasTotais.length;k++){
        const part=partidasTotais[k]
        if(part.length==5){
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            const data=part[3]
            resp.push({
                mandante,visitante,data,camp,part
            })
        }else if(part[1].length!=2&&part.length==3){
            const nome=part[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const visitante=nome[3]+nome[4]+nome[5]
            const data=part[1]
            const texto=quantoTempoFalta(data)
            if(texto=='Finalizado'){
                resp.push({
                    mandante,visitante,data,camp,cinza:true
                })
            }
        }
    }
    return resp
}
function calcularEV(chance,odd){
    const numero=odd*chance
    return numero-(100-chance)
}