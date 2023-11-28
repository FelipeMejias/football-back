import {confEsc} from '../conferencias/confEsc.js'
import {confPlacar} from '../conferencias/confPlacar.js'
import {confGols} from '../conferencias/confGols.js'
export function analisar(context,mandante,visitante,grandeza,c,asc,metade,valor){
    const cPar=c==1?3:c==2?2:1
    const mandantePuro=conferir(context,grandeza,c,asc,0,metade,valor,mandante)
    const visitantePuro=conferir(context,grandeza,cPar,asc,0,metade,valor,visitante)
    const mandanteEstadia=conferir(context,grandeza,c,asc,1,metade,valor,mandante)
    const visitanteEstadia=conferir(context,grandeza,cPar,asc,2,metade,valor,visitante)
    return [[mandantePuro,visitantePuro],[mandanteEstadia,visitanteEstadia]]
}
function conferir(context,grandeza,c,asc,estadia,metade,valor,time){
    if(grandeza==1){
        return {
            chance:confPlacar(context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }
    if(grandeza==2){
        return {
            chance:confGols(context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }
    if(grandeza==6){
        return {
            chance:confEsc(context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }    
}
export function frasesAnalise(grandeza,c,asc,estadia,metade,valor){
    const complementos=[
        '',' no 1º tempo',' no 2º tempo'
    ]
    const complementos2=[
        '',' em casa',' fora de casa'
    ]
    if(grandeza==1){
        const frases=[
            [['vitórias',true],['empate ou derrota',false]],
            [['empates',null],['vitória ou derrota',null]],
            [['derrotas',false],['vitória ou empate',true]],
        ]
        return frases[c-1][asc][0]+complementos[metade]+complementos2[estadia]
    }
    if(grandeza==2){
        const frases=[
            [[`mais de ${valor} gols marcados`,true],[`menos de ${valor} gols marcados`,false]],
            [[`mais de ${valor} gols`,null],[`menos de ${valor} gols`,null]],
            [[`mais de ${valor} gols sofridos`,false],[`menos de ${valor} gols sofridos`,true]],
        ]
        return frases[c-1][asc][0]+complementos[metade]+complementos2[estadia]
    }
    if(grandeza==6){
        const frases=[
            [[`mais de ${valor} escanteios a favor`,true],[`menos de ${valor} escanteios a favor`,false]],
            [[`mais de ${valor} escanteios`,null],[`menos de ${valor} escanteios`,null]],
            [[`mais de ${valor} escanteios contrários`,false],[`menos de ${valor} escanteios contrários`,true]],
        ]
        return frases[c-1][asc][0]+complementos2[estadia]
    }    
}
