import {confEsc} from '../mu/conferencias/confEsc.js'
import {confPlacar} from '../mu/conferencias/confPlacar.js'
import {confGols} from '../mu/conferencias/confGols.js'
import { buildContext } from '../bancos.js'
import { buscarApostasJogo } from './apostas.js'
import { confPrimGol } from '../mu/conferencias/confPrimGol.js'
import { confUltimoGol } from '../mu/conferencias/confUltimoGol.js'
import { getPartida } from './getPartida.js'
import { quantoTempoFalta } from '../mu/utils.js'
export function analisar(camp,mandante,visitante,grandeza,c,asc,metade,valor){
    const context=buildContext(camp)
    const cPar=c==1?3:c==2?2:1
    const mandantePuro=conferir(context,grandeza,c,asc,0,metade,valor,mandante)
    const visitantePuro=conferir(context,grandeza,cPar,asc,0,metade,valor,visitante)
    const mandanteEstadia=conferir(context,grandeza,c,asc,1,metade,valor,mandante)
    const visitanteEstadia=conferir(context,grandeza,cPar,asc,2,metade,valor,visitante)
    const umTime=mandante==visitante?conferir(context,grandeza,c,asc,2,metade,valor,mandante):null
    const apostas=umTime?null:buscarApostasJogo(camp,mandante,visitante)
    const codigo=`${grandeza}${c}${asc}${metade}`
    const objetoAposta=umTime||apostas.length==0?false:objetoApostas(apostas,codigo,grandeza,valor)
    let comecou=null
    if(objetoAposta){
        const {partidasTotais}=buildContext(camp,true)
        const part=getPartida(partidasTotais,mandante+visitante)
        const data=part[1]
        const tempo=quantoTempoFalta(data)
        if(tempo[0]=='F'||tempo[0]=='C')comecou=true
    }
    return umTime?[[mandantePuro],[mandanteEstadia,umTime]]:[[mandantePuro,visitantePuro],[mandanteEstadia,visitanteEstadia],objetoAposta?{
        ...objetoAposta,comecou,nome:`${camp+mandante+visitante}${codigo}${valor||valor===0?valor:''}`
    }:null]
}
function conferir(context,grandeza,c,asc,estadia,metade,valor,time){
    if(grandeza==1){
        return {
            chance:confPlacar(100,context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }
    if(grandeza==2){
        return {
            chance:confGols(100,context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }
    if(grandeza==6){
        return {
            chance:confEsc(100,context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }  
    if(grandeza==7){
        return {
            chance:confPrimGol(100,context,estadia,metade,time,c,asc,valor),
            texto:frasesAnalise(grandeza,c,asc,estadia,metade,valor)
        }
    }  
    if(grandeza==8){
        return {
            chance:confUltimoGol(100,context,estadia,metade,time,c,asc,valor),
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
            [['vitórias',true],['derrota ou empate',false]],
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
    }if(grandeza==7){
        const frases=[
            [[`marcou o primeiro gol`,true],[`------`,false]],
            [[`----`,null],[`----`,null]],
            [[`sofreu o primeiro gol`,false],[`------`,true]],
        ]
        return frases[c-1][asc][0]+complementos2[estadia]
    } if(grandeza==8){
        const frases=[
            [[`marcou o último gol`,true],[`------`,false]],
            [[`----`,null],[`----`,null]],
            [[`sofreu o último gol`,false],[`------`,true]],
        ]
        return frases[c-1][asc][0]+complementos2[estadia]
    }    
}


function objetoApostas(apostas,codigo,grandeza,valor){
    for(let ap of apostas){
        const {info,odd,texto,green:grGrande}=ap
        if(info==codigo){
            if(grandeza!=1){
                for(let esp of odd){
                    const {o,q,green:grPequeno}=esp
                    if(valor==q){
                        const tex=texto.replace('X',q)
                        return {tex,ode:o,green:grPequeno,codigo}
                    }
                    
                }
            }else{
                return {tex:texto,ode:odd,green:grGrande,codigo}
            }
        }

    }
    return false
}