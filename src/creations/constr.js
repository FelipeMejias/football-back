import { acharAposta } from "../profundo/apostas"
import { conferir } from "../profundo/conferir"
import { acharPar } from "../profundo/dupla"
import { criarOrdem } from "../profundo/individual"

export const myPhase=0
/*

[
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
    ['','2311'],
],[


*/
export function criarOrdemDuplaAposta(context,camp,mandante,visitante,odds,phase){
    let y='['
    console.log(`==== ${mandante.toUpperCase()} x ${visitante.toUpperCase()} ====`)
    const ordemMandante=criarOrdem(context,mandante,true)
    const ordemVisitante=criarOrdem(context,visitante,true)
    const listaApo=[]
    const listao=[]
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap,pos}=est
        if(pos<5){
            const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
            if(par){
                if(par.pos<5){
                    
                    const aposta=acharAposta(mandante,visitante,camp,est,par,true)
                    
                    if(aposta){
                        
                        const {texto,valor}=aposta
                        if(!texto)console.log(aposta)
                        let naoTa=true
                        let index=0
                        let finalIndex
                        listaApo.forEach((apo,ind)=>{
                            if(apo.texto==texto){
                                naoTa=false
                                finalIndex=ind
                            }
                            index++
                        })
                        if(naoTa){
                            let odd=0
                            let odr=1
                            if(phase==2){
                                odr=odds[index]
                            }
                            if(phase==1)console.log(aposta.texto)
                            listaApo.push({texto,odd})
                            const conferir1E=conferir(context,grandeza,c,asc,1,metade,valor,mandante)
                            const conferir2E=conferir(context,grandeza,par.c,asc,2,metade,valor,visitante)
                            const conferir1=conferir(context,grandeza,c,asc,0,metade,valor,mandante)
                            const conferir2=conferir(context,grandeza,par.c,asc,0,metade,valor,visitante)
                            let chance=((conferir1E.chance+conferir2E.chance)/2).toFixed(0)
                            if(chance==100)chance=99
                            if(odr){
                                if(phase==2)y+=`[${odr},${grandeza}${c}${asc}${metade?metade:0},${grandeza==1?0:valor},${chance}],`
                                listao.push({texto,odr,chance,estat:[[conferir1,conferir2],[conferir1E,conferir2E]]})
                            }
                        }
                    }
                }
            }
        }
    })
    y+=']'
    
    if(phase==2){
        console.log(y)
    }
    console.log('===========================')
    return listao
}
