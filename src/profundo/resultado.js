import dayjs from "dayjs";
import { buildApostas } from "../especiais/buildApostas.js";
import { avanca7dias, traduzirData } from "../utils.js";

export function buildResultado(camps,tipos,ev){
    const apostasRaw=buildApostas(3).filter(a=>a.green!==null)
    const apostas=apostasRaw.filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
    let din=0;let ganho=0;let red=0;let green=0;
    for(let ap of apostas){
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
        let ganhoAdd=0;let dinAdd=0

        for(let ap of rodadas[k]){
            if(ap.green===null||ap.green===undefined){
                if(ap.green===undefined)abertas++
                ganhoAdd+=ap.odd
                dinAdd++
            }else{
                din2++
            if(ap.green)ganho2+=ap.odd
            if(ap.green){green2++}else{red2++}
            }
            
        }
        const porc2=Math.round((green2/din2)*100)
        const lucroRaw2=ganho2/din2
        const lucroMedium2=Math.round((lucroRaw2%1)*100)
        const lucro2=lucroRaw2>1?lucroMedium2:-(100-lucroMedium2)

        const lucroPotRaw=(ganho2+ganhoAdd)/(din2+dinAdd)
        const lucroPotMedium=Math.round((lucroPotRaw%1)*100)
        const lucroPotencial=lucroPotRaw>1?lucroPotMedium:-(100-lucroPotMedium)

        respRodadas.push({numero:k+1,abertas,porc:porc2,green:green2,red:red2,lucro:lucro2,apostas:rodadas[k],lucroPotencial})
    }
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=Math.round((lucroRaw%1)*100)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium)
    return {rodadas:respRodadas,porc,green,red,lucro,apostas}
}
function porRodada(camps,tipos,ev){
    const resp=[]
    let data='240213'
    let aindaFalta=true
    const agora=traduzirData(dayjs())
    while(aindaFalta){
        const dataInicio=data
        data=avanca7dias(data)
        const apostas=buildApostas(2,dataInicio,data).filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
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