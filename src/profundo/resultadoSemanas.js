import dayjs from "dayjs";
import { avanca7dias, traduzirData } from "../utils.js";
import { buildApostas } from "../especiais/buildApostaNovo.js";

export function resultadoSemanas(camp,tipos,ev){
    const rodadas=porRodada(camp,tipos,ev)
    const respRodadas=[]
    for(let k=rodadas.length-1;k>=0;k--){
        let din=0;let ganho=0;
        let red=0;let green=0;
        for(let ap of rodadas[k]){
            if(ap.green===null||ap.green===undefined){
            }else{
                din++
            if(ap.green)ganho+=ap.odd
            if(ap.green){green++}else{red++}
            }
            
        }
        const porc=Math.round((green/din)*100)
        const lucroRaw=ganho/din
        const lucroMedium=((lucroRaw-(lucroRaw>1?1:0))*100).toFixed(1)
        const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium).toFixed(1)
        
        respRodadas.push({numero:k+1,porc,green,red,lucro,apostas:rodadas[k]})
    }
    return respRodadas
}
function porRodada(camp,tipos,ev){
    const resp=[]
    let data='240213'
    let aindaFalta=true
    const agora=traduzirData(dayjs())
    while(aindaFalta){
        const dataInicio=data
        data=avanca7dias(data)
        const apostas=buildApostas(2,dataInicio,data).filter(a=>(
camp==a.camp&&
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