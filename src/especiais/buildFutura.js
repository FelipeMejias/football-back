import { dataDaRodada, quantoTempoFalta } from "../utils.js"
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
    return ordenada2
}
function extrairFuturas(camp){
    const {partidasTotais}=buildContext(camp,true)
    const resp=[]
    const dataRodada=dataDaRodada()
    let aindaFalta=true
    for(let k=0;k<30&&aindaFalta;k++){
        const part=partidasTotais[k]
        const nome=part[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        if(part[1].length==2){
            const data=part[3]
            if(data>dataRodada){
                const texto=quantoTempoFalta(data)
                const gols=part[2]
                let m=0;let v=0;for(let gol of gols){if(gol>0){m++}else{v++}}
                resp.push({
                    mandante,visitante,data,texto,camp,placar:[m,v]
                })
            }else{
                aindaFalta=false
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

/*
function passouMenosDeUmDia(time){
    const ano='20'+time[0]+time[1]
    const mes=time[2]+time[3]
    const dia=time[4]+time[5]
    const hora=time[6]+time[7]
    const minuto=time[8]+time[9]
    const date=dayjs(`${ano}-${mes}-${dia} ${hora}:${minuto}`)
    const hoje=dayjs()
    const mt= hoje.diff(date, 'day', true)
    return mt<1
}*/