import dayjs from "dayjs";
import { buildApostas } from "../especiais/buildApostas.js";
import { avanca7dias, traduzirData } from "../utils.js";

export function buildResultado(camps,tipos,ev){
    let t=1
    const apostas=buildApostas(3).filter(a=>(
camps.includes(a.camp)&&
tipos.includes(a.info[0])&&
a.ev>=ev
    ))
    let din=0;let ganho=0;let red=0;let green=0;
    const realApostas=deixarSomenteAsMaioresDeGols(apostas)
    for(let ap of realApostas){
        if(ap.green===null||ap.green===undefined){
            
        }else{
            din++
            if(ap.green)ganho+=ap.odd
            if(ap.green){green++}else{red++}
        }
        
    }
    const rodadas=porRodada(camps,tipos,ev)
    const respRodadas=[]
    for(let k=rodadas.length-1;k>=0;k--){
        let din2=0;let ganho2=0;
        let red2=0;let green2=0;
        let abertas=0;
        const realRodadas=deixarSomenteAsMaioresDeGols(rodadas[k])
        for(let ap of realRodadas){
            if(ap.green===null||ap.green===undefined){
                if(ap.green===undefined)abertas++
            }else{
                din2++
            if(ap.green)ganho2+=ap.odd
            if(ap.green){green2++}else{red2++}
            }
            
        }
        const porc2=Math.round((green2/din2)*100)
        const lucroRaw2=ganho2/din2
        const lucroMedium2=((lucroRaw2-(lucroRaw2>1?1:0))*100).toFixed(1)
        const lucro2=lucroRaw2>1?lucroMedium2:-(100-lucroMedium2).toFixed(1)
        
        
        const trueLucro=parseFloat(lucro2)
        if(trueLucro>0)t*=(1+trueLucro/100)
        
        respRodadas.push({numero:k+1,abertas,porc:porc2,green:green2,red:red2,lucro:lucro2,apostas:realRodadas})
    }
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=((lucroRaw-(lucroRaw>1?1:0))*100).toFixed(1)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium).toFixed(1)
    console.log(parseFloat(t.toFixed(2)))
    return {rodadas:respRodadas,porc,green,red,lucro,apostas:realApostas}
}
function porRodada(camps,tipos,ev){
    const resp=[]
    let data='240213'
    let aindaFalta=true
    const agora=traduzirData(dayjs())
    while(aindaFalta){
        const dataInicio=data
        data=avanca7dias(data)
        const apostas=buildApostas(2,dataInicio,data).filter(a=>(
camps.includes(a.camp)&&
tipos.includes(a.info[0])&&
a.ev>=ev
        ))
        if(apostas.length==0&&dataInicio>agora){
            
        }else{
            resp.push(apostas)
        }
        if(dataInicio>agora){
            aindaFalta=false
        }
    }
    return resp
}
export function deixarSomenteAsMaioresDeGols(lista){
    const resp=[]
    for(let aposta of lista){
        if(resp.length==0){
            resp.push(aposta)
        }else{
            const {info,ev,nome:w}=aposta
            const thisGame=w[0]+w[1]+w[2]+w[3]+w[4]+w[5]+w[6]+w[7]+w[8]+w[9]
            const {info:infoUltima,nome:q,ev:UltimaEv}=resp[resp.length-1]
            const ultimaGame=q[0]+q[1]+q[2]+q[3]+q[4]+q[5]+q[6]+q[7]+q[8]+q[9]
            if(info[0]=='2'&&thisGame==ultimaGame&&infoUltima==info){
                if(ev>UltimaEv){
                    resp.pop()
                    resp.push(aposta)
                }
            }else{
                resp.push(aposta)
            }
        }
    }
    return resp
}
