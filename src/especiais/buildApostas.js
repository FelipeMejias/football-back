import { buildContext, ligas } from "../bancos.js"
import { buscarApostasJogo } from "../profundo/apostas.js"
import { confGols } from "../conferencias/confGols.js"
import { confEsc } from "../conferencias/confEsc.js"
import { confPlacar } from "../conferencias/confPlacar.js"
import { quantoTempoFalta } from "../utils.js"
import { confPrimGol } from "../conferencias/confPrimGol.js"
import { confUltimoGol } from "../conferencias/confUltimoGol.js"

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
        for(let ap of apostas){
            let tex;let ode;let valor
            const {info,odd,texto,green}=ap
            let chance
            const grandeza=parseInt(info[0])
            const c=parseInt(info[1])
            const asc=parseInt(info[2])
            const metade=parseInt(info[3])
            if(grandeza!=1){
                for(let esp of odd){
                    const {o,q,green}=esp
                    let func
                    if(grandeza==2){
                        func=confGols
                    }else if(grandeza==7){
                        func=confPrimGol
                    }else if(grandeza==8){
                        func=confUltimoGol
                    }else{
                        func=confEsc
                    }
                    const preCh=preChance(func,context,mandante,visitante,metade,c,asc,q)
                    tex=texto.replace('X',q)
                    ode=parseFloat(o)
                    valor=q
                    chance=calcularChance(preCh)
                    resp.push({
                        ev:calcularEV(chance,ode),
                        chance:chance==100?99:chance,
                        texto:tex,
                        odd:ode,
                        camp,mandante,visitante,
                        green:cinza?null:green,
                        info,
                        valor,
                        nome:`${camp+mandante+visitante}${info}${info[0]==2||info[0]==6?valor:''}`
                    }) 
                }
            }else{
                const preCh=preChance(confPlacar,context,mandante,visitante,metade,c,asc,null)
                tex=texto
                ode=parseFloat(odd)
                chance=calcularChance(preCh)

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
export function extrairPassadas(camp){
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
function preChance(func,context,mandante,visitante,metade,c,asc,q){
    const ca=func(100,context,1,metade,mandante,c,asc,q)
    const fo=func(100,context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
    return {ca,fo}
}
function calcularChance(preCh){
    const {ca,fo}=preCh
    const resp=(ca+fo)/2
    return resp
}