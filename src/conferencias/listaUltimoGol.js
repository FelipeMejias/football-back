import filtrar, { filtrarGols } from "../especiais/filtrarPartidas.js"

export  function listaUltimoGol(context,estadia,metade,time,c,asc,valor){
    const {partidasTotais}=context
    const resp=[]
    const partidas=filtrar(partidasTotais,time,estadia)
    for(let partida of partidas){
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        const golos=partida[2]
        let golChave=0
        let certo=false
        if(golos){
            const gol=golos[golos.length-1]
            if(mandante==time?gol>0:gol<0){
                golChave=1
            }else{
                golChave=-1
            }
        }
        if(asc){
            if(c==1){
                if(golChave!=-1)certo=true
            }else if(c==3){
                if(golChave!=1)certo=true
            }
        }else{
            if(c==1){
                if(golChave==1)certo=true
            }else if(c==3){
                if(golChave==-1)certo=true
            }
        }
        resp.push({
            mandante,visitante,
            numero:certo?'sim':'não',
            sg:certo
        })
    }
    
    return resp
}