import { buildContext } from "../bancos.js"
import { buscarApostasJogo } from "../profundo/apostas.js"
import { confGols } from "../conferencias/confGols.js"
import { confEsc } from "../conferencias/confEsc.js"
import { confPlacar } from "../conferencias/confPlacar.js"
export function buildApostas(pageBet){
    let desordenada=[]
    let ordenada
    const camps=[/*'bra1',*/'ing1','esp1','ita1','ale1'/*,'bra2'*/]
    if(pageBet==1){
        camps.forEach(camp=>{desordenada=[...desordenada,...extrairFuturas(camp)]})
        ordenada= desordenada.sort((a,b)=>{if(a.data<b.data){return -1}else{return true}})
    }else if(pageBet==3){
        camps.forEach(camp=>{desordenada=[...desordenada,...extrairPassadas(camp)]})
        ordenada= desordenada.sort((a,b)=>{if(a.data>b.data){return -1}else{return true}})
    }else{
        camps.forEach(camp=>{desordenada=[...desordenada,...extrairFuturas(camp)]})
        const lista1= desordenada.sort((a,b)=>{if(a.data<b.data){return -1}else{return true}})
        let lista2Desord=[]
        camps.forEach(camp=>{lista2Desord=[...lista2Desord,...extrairPassadas(camp)]})
        const lista2= lista2Desord.sort((a,b)=>{if(a.data>b.data){return -1}else{return true}})
        ordenada=[...lista1,...lista2]
    }
    const resp=[]
    
    for(let partida of ordenada){
        const {camp,mandante,visitante}=partida
        const apostas=buscarApostasJogo(camp,mandante,visitante)
        const context=buildContext(camp,mandante+visitante)
        for(let ap of apostas){
            let ca;let fo;let tex;let ode;let valor;let green=undefined
            const {info,odd,texto}=ap
            
            const grandeza=parseInt(info[0])
            const c=parseInt(info[1])
            const asc=parseInt(info[2])
            const metade=parseInt(info[3])
            if(grandeza!=1){
                for(let esp of odd){
                    const {o,q}=esp
                    if(grandeza==2){
                        ca=confGols(context,1,metade,mandante,c,asc,q)
                        fo=confGols(context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        if(partida.part){
                            green=confGols({partidasTotais:[partida.part]},0,metade,mandante,c,asc,q)
                        }
                    }else{
                        ca=confEsc(context,1,metade,mandante,c,asc,q)
                        fo=confEsc(context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                        if(partida.part){
                            green=confEsc({partidasTotais:[partida.part]},1,metade,mandante,c,asc,q)
                        }
                    }
                    tex=texto.replace('X',q)
                    ode=parseFloat(o)
                    valor=q
                    resp.push({
                        chance:(ca+fo)/2,
                        texto:tex,
                        odd:ode,
                        camp,mandante,visitante,
                        green,
                        info,
                        valor,
                        nome:`${camp+mandante+visitante}${info}${valor}`
                    }) 
                }
            }else{
                ca=confPlacar(context,1,metade,mandante,c,asc,null)
                fo=confPlacar(context,2,metade,visitante,c==1?3:c==2?2:1,asc,null)
                if(partida.part){
                    green=confPlacar({partidasTotais:[partida.part]},1,metade,mandante,c,asc,null)
                }
                tex=texto
                ode=parseFloat(odd)
                resp.push({
                    chance:(ca+fo)/2,
                    texto:tex,
                    odd:ode,
                    camp,mandante,visitante,
                    green,
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
            resp.push({
                mandante,visitante,data,camp
            })
        }else{
            return resp
        }
    }
    return resp
}
function extrairPassadas(camp){
    const {partidasTotais}=buildContext(camp)
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
        }
    }
    return resp
}