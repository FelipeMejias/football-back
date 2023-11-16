import { conferir } from "./conferir.js"

export function analisar(context,mandante,visitante,grandeza,c,asc,metade,valor){
    const cPar=c==1?3:c==2?2:1
    const mandantePuro=conferir(context,grandeza,c,asc,0,metade,valor,mandante)
    const visitantePuro=conferir(context,grandeza,cPar,asc,0,metade,valor,visitante)
    const mandanteEstadia=conferir(context,grandeza,c,asc,1,metade,valor,mandante)
    const visitanteEstadia=conferir(context,grandeza,cPar,asc,2,metade,valor,visitante)
    return [[mandantePuro,visitantePuro],[mandanteEstadia,visitanteEstadia]]
}