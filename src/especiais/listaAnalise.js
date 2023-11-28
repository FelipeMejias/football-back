import { listaEsc } from "../conferencias/listaEsc.js"
import { listaGols } from "../conferencias/listaGols.js"
import { listaPlacar } from "../conferencias/listaPlacar.js"
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
}