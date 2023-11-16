import { createAle1 } from "../creations/part_ale1.js"
import { createBra2 } from "../creations/part_bra2.js"
import { createBra1 } from "../creations/part_bra1.js"
import { createEsp1 } from "../creations/part_esp1.js"
import { createIng1 } from "../creations/part_ing1.js"
import { createIta1 } from "../creations/part_ita1.js"
import { quantoTempoFalta } from "../utils.js"

export function buildFutura(){
    const desordenada=[]
    const listao=[createBra1[0],createIng1[0],createEsp1[0],createIta1[0],createAle1[0],createBra2[0]]
    const camps=['bra1','ing1','esp1','ita1','ale1','bra2']
    listao.forEach((list,index)=>{
        list.forEach(part=>{
            if(part.length==2||(part.length==3&&typeof(part[2][0])!='number')){
                const nome=part[0]
                const mandante=nome[0]+nome[1]+nome[2]
                const visitante=nome[3]+nome[4]+nome[5]
                const data=part[1]
                const texto=quantoTempoFalta(data)
                const camp=camps[index]
                desordenada.push({
                    mandante,visitante,data,texto,camp
                })
            }
        })
    })
    const ordenada1= desordenada.sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    const ordenada2= ordenada1.sort((a,b)=>{
        if(a.texto!=='Finalizado' && b.texto=='Finalizado'){
            return -1
        }else{return true}
    })
    return ordenada2
}
