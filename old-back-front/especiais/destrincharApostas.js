import { buildContext } from "../bancos"
import { entregarAposta } from "./buildAposta"

export function destrincharAposta(pal){
    const camp=pal[0]+pal[1]+pal[2]+pal[3]
    const mandante=pal[4]+pal[5]+pal[6]
    const visitante=pal[7]+pal[8]+pal[9]
    const index=parseInt(pal[10]+pal[11])
    const banco=buildContext(camp,true)
    const partida=acharPartida(banco,mandante+visitante)
    if(partida.length==3){
        const data=partida[1]
        const context=buildContext(camp,null)
        const odr=partida[2][index]
        const aposta= entregarAposta(context,camp,mandante,visitante,index,odr)
        return {...aposta,data}
    }else{
        const odr=partida[3][index]
        const aposta= entregarAposta(null,camp,mandante,visitante,index,odr,[partida])
        return {...aposta}
    }
}
export function jaAconteceu(pal){
    const camp=pal[0]+pal[1]+pal[2]+pal[3]
    const mandante=pal[4]+pal[5]+pal[6]
    const visitante=pal[7]+pal[8]+pal[9]
    const banco=buildContext(camp,true)
    const partida=acharPartida(banco,mandante+visitante)
    return partida.length==4
}
function acharPartida(banco,mandvis){
    for(let i=0;i<banco.length;i++){
        for(let j=0;j<banco[i].length;j++){
            const part=banco[i][j]
            if(part[0]==mandvis){
                return part
            }
        }
    }
}