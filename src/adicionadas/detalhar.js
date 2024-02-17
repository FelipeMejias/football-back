import { buildContext } from "../bancos.js"
import { buscarApostasJogo } from "../profundo/apostas.js"
import { confGols } from "../conferencias/confGols.js"
import { confEsc } from "../conferencias/confEsc.js"
import { confPlacar } from "../conferencias/confPlacar.js"
export default function detalhar(camp,mandante,visitante){
    const resp=[]
    const apostas=buscarApostasJogo(camp,mandante,visitante)
    for(let ap of apostas){
        let ca;let fo;let tex;let ode
        const {info,odd,texto}=ap
        const context=buildContext(camp)
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        if(grandeza!=1){
            for(let esp of odd){
                const {o,q}=esp
                if(grandeza==2){
                    ca=confGols(context,1,metade,mandante,c,asc,q)
                    fo=confGols(context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                }else{
                    ca=confEsc(context,1,metade,mandante,c,asc,q)
                    fo=confEsc(context,2,metade,visitante,c==1?3:c==2?2:1,asc,q)
                }
                tex=texto.replace('X',q)
                ode=parseFloat(o)
            }
        }else{
            ca=confPlacar(context,1,metade,mandante,c,asc,null)
            fo=confPlacar(context,2,metade,visitante,c==1?3:c==2?2:1,asc,null)
            tex=texto
            ode=parseFloat(odd)
        }
        resp.push({
            ch:(ca+fo)/2,tex,ode,jog:camp+mandante+visitante
        }) 
    }
    return resp
}