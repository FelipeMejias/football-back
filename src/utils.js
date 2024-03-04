import dayjs from "dayjs"

export function quantoTempoFalta(time){
    const ano='20'+time[0]+time[1]
    const mes=time[2]+time[3]
    const dia=time[4]+time[5]
    const hora=time[6]+time[7]
    const minuto=time[8]+time[9]
    const date=dayjs(`${ano}-${mes}-${dia} ${hora}:${minuto}`)
    const hoje=dayjs()
    const mt= date.diff(hoje, 'minute', true)
    const dias=Math.floor(mt/1440)
    const horas=Math.floor(mt%1440/60)
    const minutos=Math.floor(mt%1440%60)
    if(mt<1){
        if(mt<-120){
            return 'Finalizado'
        }else{
            return 'Em andamento'
        }
    }else{
        if(dias||horas){
            const parte1=textoDia(date,hoje,dias)
            return `${parte1}-${hora}:${minuto}`
        }else{
            return `${minutos==1?'Falta':'Faltam'} ${minutos} ${minutos==1?'minuto':'minutos'} `
        }
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
            label=texto
            respRaw.push({...item,texto:hora})
        }else if(label==''){
            label=texto
            respRaw.push({...item,texto:hora})
        }else if(label==texto){
            respRaw.push({...item,texto:hora})
        }else if(label!=texto&&texto[0]!='E'&&texto[0]!='F'){
            respRaw.push({label})
            label=texto
            respRaw.push({...item,texto:hora})
        }else if((texto[0]!='E'||texto[0]!='F')&&label!='Hoje'){
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

