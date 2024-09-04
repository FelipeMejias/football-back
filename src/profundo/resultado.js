import dayjs from "dayjs";
import { buildApostas } from "../especiais/buildApostas.js";
import { avanca7dias, traduzirData } from "../essencials/utils.js";

export function buildResultado(camps,tipos,ev){
    const abertas=[]
    const antigas=[]
    const apostas=buildApostas(2).filter(a=>(
camps.includes(a.camp)&&
tipos.includes(a.info[0])&&
//a.odd<=2.3&&
//a.odd>=1.4&&
a.ev>=ev
    ))
    let din=0;let ganho=0;let red=0;let green=0;
    for(let ap of apostas){
        if(ap.green===null||ap.green===undefined){
            abertas.push(ap)
        }else{
            antigas.push(ap)
            din++
            if(ap.green)ganho+=ap.odd
            if(ap.green){green++}else{red++}
        }
        
    }
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=((lucroRaw-(lucroRaw>1?1:0))*100).toFixed(1)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium).toFixed(1)
    return {porc,green,red,lucro,abertas,antigas}
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
