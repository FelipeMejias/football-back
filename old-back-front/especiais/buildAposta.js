import { buildContext } from "../bancos"
import { createAle1 } from "../creations/part_ale1"
import { createBra2 } from "../creations/part_bra2"
import { createBra1 } from "../creations/part_bra1"
import { createEsp1 } from "../creations/part_esp1"
import { createIng1 } from "../creations/part_ing1"
import { createIta1 } from "../creations/part_ita1"
import {  textoAposta } from "../profundo/apostas"
import { conferir } from "../profundo/conferir"
import { criarOrdemDuplaAposta, myPhase } from "../creations/constr"

export function buildAposta(page){
    const resp=[]
    const camps=['bra1','ing1','esp1','ita1','ale1','bra2']
    if(page==1){
        const listao=[createBra1[0],createIng1[0],createEsp1[0],createIta1[0],createAle1[0],createBra2[0]]
        listao.forEach((list,index)=>{
            const context=buildContext(camps[index],null)
            list.forEach(part=>{
                if(part.length==3||myPhase){
                    const nome=part[0]
                    const data=part[1]
                    const mandante=nome[0]+nome[1]+nome[2]
                    const visitante=nome[3]+nome[4]+nome[5]
                    const camp=camps[index]
                    const odds=part[2]||false
                    let ordem
                    if(myPhase){
                        ordem=criarOrdemDuplaAposta(context,camp,mandante,visitante,odds,myPhase)
                    }else{
                        ordem=odds?darApostas(context,camp,mandante,visitante,odds):[]
                    }
                    ordem?.forEach(ord=>{resp.push({...ord,data})})
                }
            })
        })
    }else if(page==2){
        /*let totalGanho=0
        let totalColocado=0
        const odd_minima=1.75
        const chance_minima=70*/
        camps.forEach((camp,index)=>{
            const {partidasTotais}=buildContext(camp)
            partidasTotais.forEach(part=>{
                if(part.length==4){
                    const nome=part[0]
                    const mandante=nome[0]+nome[1]+nome[2]
                    const visitante=nome[3]+nome[4]+nome[5]
                    const odds=part[3]
                    const ordem=darApostas(null,camp,mandante,visitante,odds,[part])
                    ordem?.forEach(ord=>{
                        /*if(ord.odd>odd_minima&&ord.chance>chance_minima){
                            totalColocado++
                            if(ord.green==100){
                                totalGanho+=ord.odd
                            }
                        }*/
                        resp.push(ord)
                    })
                }
            })
        })
        //console.log(totalGanho/totalColocado)
    }
    
    return resp.sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
}
export function darApostas(context,camp,mandante,visitante,oddsR,x=false){
    const listao=[]
    oddsR.forEach((odr,index)=>{
        const aposta=entregarAposta(context,camp,mandante,visitante,index,odr,x)
        listao.push(aposta)
    })
    return listao
}
export function entregarAposta(context,camp,mandante,visitante,index,odr,x=false){
        const oddRaiz=odr[0]
        const odd = parseFloat((oddRaiz/100).toFixed(2))
        if(!odr[1])console.log(mandante,visitante,odr)
        const info=odr[1].toString()
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const cPar=c==1?3:c==2?2:1
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        const valor=odr[2]
        const texto=textoAposta(camp,mandante,visitante,grandeza,c,asc,metade,valor)
        if(x){
            const confere=conferir({partidasTotais:x},grandeza,c,asc,0,metade,valor,mandante)
            const green=confere.chance
            const chance=odr[3]
            return{texto,odd,chance,green,
                nome:`${camp+mandante+visitante+index}`,
                jogo:{mandante,visitante,camp}
            }
        }else{
            const conferir1E=conferir(context,grandeza,c,asc,1,metade,valor,mandante)
            const conferir2E=conferir(context,grandeza,cPar,asc,2,metade,valor,visitante)
            const conferir1=conferir(context,grandeza,c,asc,0,metade,valor,mandante)
            const conferir2=conferir(context,grandeza,cPar,asc,0,metade,valor,visitante)
            let chance=(conferir1E.chance+conferir2E.chance)/2
            if(chance==100)chance=99
            return{
                nome:`${camp+mandante+visitante+index}`,
                texto,odd,chance,
                estat:[[conferir1,conferir2],[conferir1E,conferir2E]],
                jogo:{mandante,visitante,camp}
            }
        }
}