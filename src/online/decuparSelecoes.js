import { buscarApostasJogo } from "../especiais/apostasNovo.js"

export function decuparSelecoes(selecoes){
    const lista=selecoes.split('+')
    let odd=1
    for(let s of lista){
        const camp=s[0]+s[1]+s[2]+s[3]
        const mandante=s[4]+s[5]+s[6]
        const visitante=s[7]+s[8]+s[9]
        const info=s[10]+s[11]+s[12]+s[13]
        const quantidade=s[14]
        const apostas=buscarApostasJogo(camp,mandante,visitante)
        for(let a of apostas){
            if(a.info==info){
                if(info[0]=='1'){
                    odd*=parseFloat(a.aps[0].odd)
                }else{
                    const q=parseInt(quantidade)
                    for(let ap of a.aps){
                        if(ap.q==q){
                            odd*=ap.odd
                        }
                    }
                }
            }
        }
        
    }
    return odd
}