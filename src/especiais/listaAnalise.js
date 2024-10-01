import { listaEsc } from "../mu/conferencias/listaEsc.js"
import { listaGols } from "../mu/conferencias/listaGols.js"
import { listaPlacar } from "../mu/conferencias/listaPlacar.js"
import { listaPrimGol } from "../mu/conferencias/listaPrimGol.js"
import { listaUltimoGol } from "../mu/conferencias/listaUltimoGol.js"
import { frasesAnalise } from "./analise.js"

export function listaAnalise(context,grandeza,estadia,metade,time,c,asc,valor){
    const complementos=[
        '',' no 1º tempo',' no 2º tempo'
    ]
    if(grandeza==1){
        return {
            titulo:frasesAnalise(grandeza,c,asc,estadia,metade,valor),
            subtitulo:`placar${complementos[metade]}`,
            resp:listaPlacar(context,estadia,metade,time,c,asc,valor)
        }
    }
    if(grandeza==2){
        return {
            titulo:frasesAnalise(grandeza,c,asc,estadia,metade,valor),
            subtitulo:`gols${c==1?' marcados':c==3?' sofridos':''}${complementos[metade]}`,
            resp:listaGols(context,estadia,metade,time,c,asc,valor)
        }
    }
    if(grandeza==6){
        return {
            titulo:frasesAnalise(grandeza,c,asc,estadia,metade,valor),
            subtitulo:`escanteios${c==1?' a favor':c==3?' contrários':''}`,
            resp:listaEsc(context,estadia,metade,time,c,asc,valor)
        }
    }  
    if(grandeza==7){
        return {
            titulo:frasesAnalise(grandeza,c,asc,estadia,metade,valor),
            subtitulo:`${(c==1&&!asc)||(c==3&&asc)?'marcou':'sofreu'} primeiro`,
            resp:listaPrimGol(context,estadia,metade,time,c,asc,valor)
        }
    }  
    if(grandeza==8){
        return {
            titulo:frasesAnalise(grandeza,c,asc,estadia,metade,valor),
            subtitulo:`${(c==1&&!asc)||(c==3&&asc)?'marcou':'sofreu'} por último`,
            resp:listaUltimoGol(context,estadia,metade,time,c,asc,valor)
        }
    }    
}