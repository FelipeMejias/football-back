import { buildContext, ligas } from "../bancos.js"
import { confEsc } from "../mu/conferencias/confEsc.js"
import { confGols } from "../mu/conferencias/confGols.js"
import { confPlacar } from "../mu/conferencias/confPlacar.js"
import { confPrimGol } from "../mu/conferencias/confPrimGol.js"
import { confUltimoGol } from "../mu/conferencias/confUltimoGol.js"
import { listaEsc } from "../mu/conferencias/listaEsc.js"
import { listaGols } from "../mu/conferencias/listaGols.js"
import { getPartida } from "../especiais/getPartida.js"
import { listaAnalise } from "../especiais/listaAnalise.js"

export function buscarApostasJogo(camp,mandante,visitante){
    const {partidasTotais}=buildContext(camp,true)
    const partida=getPartida(partidasTotais,mandante+visitante)
    const jogoAntigo=partida[1].length==2
    const odr=partida.length==3?jogoAntigo?false:partida[2]:partida[4]
    if(!odr)return []
    const apostas=[]
    for(let caso of odr){
        const lis=caso.split('-')
        const info=lis[0]
        const num=lis[1]
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        if(grandeza==1){
            const green=jogoAntigo?(
            confPlacar(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,null).porc
            ):undefined
            apostas.push({info,aps:[{tex:'',q:null,odd:conversor(num),green}]})
        }
        if(grandeza==2){
            const aps=[]
            let maq=parseInt(num[0])
            let i=1
            const maior=asc?'Menos que':'Mais que'
            while(i<num.length){
                const ode=`${num[i]}${num[i+1]}${num[i+2]}`
                const green=jogoAntigo?(
                    confGols(1,{partidasTotais:[partida]},0,metade,mandante,c,asc,qtd).porc
                    ):undefined
                    
                aps.push({tex:`${maior} ${maq}`,q:maq,odd:conversor(ode),green})
                i+=3
                maq+=1
            }
            apostas.push({info,aps})
        }
        
    }
    return apostas
}
function conversor(str){
    const inteiro=parseInt(str)
    const divisao=inteiro/100
    return divisao.toFixed(2)
}