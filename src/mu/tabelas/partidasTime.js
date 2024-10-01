import { quantoTempoFalta } from "../utils.js"

export  function partidasTime(context,time){
    const resp=[]
    const {partidasTotais}=context
    for(let partida of partidasTotais){
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        if(mandante==time||visitante==time){
            if(partida[1].length==2){
                const gols=partida[2]
                let m=0
                let v=0
                for(let gol of gols){
                    if(gol>0){
                        m++
                    }else{
                        v++
                    }
                }
                resp.push({
                    mandante,
                    visitante,
                    placar:[m,v],
                    sg:mandante==time?m-v:v-m
                })
            }else{
                const data=partida[1]
                let texto=quantoTempoFalta(data)
                if(texto.includes('-')){
                    const lis=texto.split('-')
                    texto=lis[0]+' '+lis[1]
                }
                resp.push({
                    mandante,
                    visitante,
                    texto
                })
            }
        }
    }
    return resp
}