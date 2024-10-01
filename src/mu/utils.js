import dayjs from "dayjs"
import { buildContext } from "../bancos.js"
import { getPartida } from "../especiais/getPartida.js"
import { buildFutura } from "../especiais/buildFutura.js"

export function quantoTempoFalta(time){
    const nowRaw=horario()
    const now=dayjs(nowRaw)
    const ano='20'+time[0]+time[1]
    const mes=time[2]+time[3]
    const dia=time[4]+time[5]
    const hora=time[6]+time[7]
    const minuto=time[8]+time[9]
    const date=dayjs(`${ano}-${mes}-${dia} ${hora}:${minuto}`)
    const mt= date.diff(now, 'minute', true)
    const dias=Math.floor(mt/1440)
    const horas=Math.floor(mt%1440/60)
    const minutos=Math.floor(mt%1440%60)
    if(mt<1){
        if(mt<-120){
            return 'Finalizado'
        }else{
            return `Começou!Hoje-${hora}:${minuto}`
        }
    }else{
        if(true||dias||horas){
            let parte1
            if(dias>6){
                parte1=`${dia}/${mes}`
            }else{
                parte1=textoDia(date,now,dias)
            }
            return `${parte1}-${hora}:${minuto}`
        }else{
            return `${minutos==1?'Falta':'Faltam'} ${minutos} ${minutos==1?'minuto':'minutos'} `
        }
    }
}
export function dataParaTopo(camp,mandante,visitante){
    const futuras=buildFutura([camp])
    for(let item of futuras){
        if(mandante==item.mandante&&visitante==item.visitante)return item.texto
    }
}
export function colocarLabels(lista){
    const respRaw=[]
    let label=''
    for(let k=lista.length-1;k>=0;k--){
        const item=lista[k]
        const lis=item.texto.split('-')
        const texto=lis[0]
        const hora=lis[1]
        if(texto=='Finalizado'){
            label='Finalizadas'
            respRaw.push({...item,texto:''})
        }else if(label=='Finalizadas'&&texto!='Finalizado'){
            respRaw.push({label})
            label=texto.replace('Começou!','')
            respRaw.push({...item,texto:hora})
        }else if(label==''){
            label=texto.replace('Começou!','')
            respRaw.push({...item,texto:hora})
        }else if(label==texto){
            respRaw.push({...item,texto:hora})
        }else if(label!=texto&&texto[0]!='C'&&texto[0]!='F'){
            respRaw.push({label})
            label=texto.replace('Começou!','')
            respRaw.push({...item,texto:hora})
        }else if((texto[0]!='C'||texto[0]!='F')&&label!='Hoje'){
            respRaw.push({label})
            label='Hoje'
            respRaw.push({...item,texto})
        }else{
            respRaw.push({...item,texto})
        }
    }
    respRaw.push({label})
    return respRaw.reverse()
}
function textoDia(jogo,hoje,dias){
    const diaJogo=jogo['$W']
    const diaHoje=hoje['$W']
    if(diaHoje==diaJogo&&dias==0){
        return 'Hoje'
    }else if((diaHoje+1==diaJogo||diaJogo==0&&diaHoje==6)&&dias<2){
        return 'Amanhã'
    }else if(diaJogo==0){
        return 'Domingo'
    }else if(diaJogo==1){
        return 'Segunda'
    }else if(diaJogo==2){
        return 'Terça'
    }else if(diaJogo==3){
        return 'Quarta'
    }else if(diaJogo==4){
        return 'Quinta'
    }else if(diaJogo==5){
        return 'Sexta'
    }else if(diaJogo==6){
        return 'Sábado'
    }
}
function horario(){
    const str=new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})
    const list=str.split(', ')
    const date=list[0];
    const arr=date.split('/')
    const finalDate=`${arr[2]}-${arr[0].length==2?arr[0]:`0${arr[0]}`}-${arr[1].length==2?arr[1]:`0${arr[1]}`}`
    const time=list[1].split(' ')
    const parts=time[0].split(':')
    let hour=parseInt(parts[0])
    if(time[1]=='PM')hour+=hour==12?0:12
    if(time[1]=='AM'&&time[0][0]==1&&time[0][1]==2)hour=0
    const finalTime=`${hour>9?hour:`0${hour}`}:${parts[1].length==2?parts[1]:`0${parts[1]}`}:${parts[2].length==2?parts[2]:`0${parts[2]}`}`
    const resp=`${finalDate} ${finalTime}`
    return resp
}

export function avanca7dias(time){
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
export function traduzirData(re){
    const year=re['$y']
    const month=re['$M']+1
    const day=re['$D']
    const resp=`${year%1000}${month<10?'0':''}${month}${day<10?'0':''}${day}`
    return resp
}
export function passouMenosDeUmaSemana(time){
    const ano='20'+time[0]+time[1]
    const mes=time[2]+time[3]
    const dia=time[4]+time[5]
    const hora=time[6]+time[7]
    const minuto=time[8]+time[9]
    const date=dayjs(`${ano}-${mes}-${dia} ${hora}:${minuto}`)
    const hoje=dayjs()
    const mt= hoje.diff(date, 'day', true)
    return mt<7
}