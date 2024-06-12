import { dataDaRodada, passouMenosDeUmDia, quantoTempoFalta } from "../utils.js"
import { buildContext, ligas } from "../bancos.js"
export function buildFutura(camps){
    let desordenada=[]
    const {paths}=ligas
    const escolhidos=camps||paths
    escolhidos.forEach(camp=>{
        desordenada=[...desordenada,...extrairFuturas(camp)]
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
    const ordenada3= ordenada2.sort((a,b)=>{
        if(a.texto=='Finalizado' && b.texto=='Finalizado' && a.data>b.data){
            return -1
        }else{return true}
    })
    return ordenada3
}
function extrairFuturas(camp){
    const {partidasTotais}=buildContext(camp,true)
    const resp=[]
    const dataRodada=dataDaRodada()
    let aindaFalta=true
    for(let k=0; aindaFalta ;k++){
        const part=partidasTotais[k]
        if(!part)return resp
        const nome=part[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        if(part[1].length==2){
            const data=part[3]
            if(data>dataRodada||passouMenosDeUmDia(data)){
                const texto=quantoTempoFalta(data)
                const gols=part[2]
                let m=0;let v=0;for(let gol of gols){if(gol>0){m++}else{v++}}
                resp.push({
                    mandante,visitante,data,texto,camp,placar:[m,v]
                })
            }else{
                if(true||camp!='jap1')aindaFalta=false
            }
        }else{
            const data=part[1]
            const texto=quantoTempoFalta(data)
            resp.push({
                mandante,visitante,data,texto,camp
            })
        }
    }
    return resp
}

