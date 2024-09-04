import dayjs from "dayjs";
import { avanca7dias, traduzirData } from "../essencials/utils.js";
import { buildApostas } from "../especiais/buildApostas.js";

export function resultadoSemanas(camps,tipos,ev){
    const rodadas=porRodada(camps,tipos,ev)
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
function porRodada(camps,tipos,ev){
    const resp=[]
    let data='240530'
    let aindaFalta=true
    const agora=traduzirData(dayjs())

    while(aindaFalta){
        const dataInicio=data
        data='241212'//avanca7dias(data)
        const apostas=buildApostas(2,dataInicio+'0000',data+'0000').filter(a=>(
camps.includes(a.camp)&&
//a.odd<=2.7&&
//a.odd>=1.2&&
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