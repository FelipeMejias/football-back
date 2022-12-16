import dayjs from "dayjs"
export function getPartidasTime(banco,time){
    const partidas=banco.filter(part=>(
        part.mandante==time||part.visitante==time
    ))
    return partidas
}



export function buildTimeResponse(ganhou,empatou,perdeu,listFez,listNada,listTomou){
    const total=(ganhou+empatou+perdeu)/100
    const fezLen=listFez.length
    const tomouLen=listTomou.length
    const nadaLen=listNada.length
    const totalList=(fezLen+nadaLen+tomouLen)/100
    const resp={
        resultados:{
            ganhou:{total:ganhou,perc:(ganhou?ganhou/total:0)},
            empatou:{total:empatou,perc:(empatou?empatou/total:0)},
            perdeu:{total:perdeu,perc:(perdeu?perdeu/total:0)}
        },
        fez:{
            lista:listFez,
            perc:(fezLen?fezLen/totalList:0),
            total:fezLen
        },
        nada:{
            lista:listNada,
            perc:(nadaLen?nadaLen/totalList:0),
            total:nadaLen
        },
        tomou:{
            lista:listTomou,
            perc:(tomouLen?tomouLen/totalList:0),
            total:tomouLen
        },
    }
    return resp
}
export function quantoTempoFalta(time){
    const now=horario()
    const ano='20'+time[0]+time[1]
    const mes=time[2]+time[3]
    const dia=time[4]+time[5]
    const hora=time[6]+time[7]
    const minuto=time[8]+time[9]
    const date=dayjs(`${ano}-${mes}-${dia} ${hora}:${minuto}`)
    const mt= date.diff(dayjs(now), 'minute', true)
    return {
        dias:Math.floor(mt/1440),
        horas:Math.floor(mt%1440/60),
        minutos:Math.floor(mt%1440%60)
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
    const finalTime=`${hour>9?hour:`0${hour}`}:${parts[1].length==2?parts[1]:`0${parts[1]}`}:${parts[2].length==2?parts[2]:`0${parts[2]}`}`
    const resp=`${finalDate} ${finalTime}`
    return resp
}
export function ordenarIndividual(lista){
    const used=[]
    const final=[]
    for(let k=0;k<lista.length;k++){
        let using
        let posi={pos:Infinity}
        for(let h=0;h<lista.length;h++){
            if(used.includes(h))continue
            const item=lista[h]
            if(item.pos<posi.pos || ( item.pos==posi.pos && item.relev>posi.relev )){
                using=h
                posi=item
            }
        }
        used.push(using)
        final.push(posi)
    }
    return final
}
export function ordenarDupla(lista){
    const used=[]
    const final=[]
    for(let k=0;k<lista.length;k++){
        let using
        let melhorSoma=Infinity
        let relev=-Infinity
        let duplinha
        for(let h=0;h<lista.length;h++){
            if(used.includes(h))continue
            const item=lista[h]
            const mandante=item[0]
            const visitante=item[1]
            const soma=mandante.pos+visitante.pos
            if(soma<melhorSoma || ( soma==melhorSoma && mandante.relev>relev )){
                using=h
                melhorSoma=soma
                relev=mandante.relev
                duplinha=item
            }
        }
        used.push(using)
        final.push(duplinha)
    }
    return final
}