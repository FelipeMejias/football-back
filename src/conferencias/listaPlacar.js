import filtrar, { filtrarGols } from "../especiais/filtrarPartidas.js"

export  function listaPlacar(context,estadia,metade,time,c,asc,valor){
    const {partidasTotais}=context
    const resp=[]
    const partidas=filtrar(partidasTotais,time,estadia)
    for(let partida of partidas){
        let nos=0
        let el=0
        const nome=partida[0]
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        const golos=partida[2]
        const gols=filtrarGols(golos,metade)
        for(let gol of gols){
            if(mandante==time?gol>0:gol<0){
                nos++
            }else{
                el++
            }
        }
        let sg=false
        if(c==1){
            if(asc){
                if(el>=nos)sg=true
            }else{
                if(nos>el)sg=true
            }
        }else if(c==2){
            if(asc){
                if(nos!=el)sg=true
            }else{
                if(nos==el)sg=true
            }
        }else if(c==3){
            if(asc){
                if(nos>=el)sg=true
            }else{
                if(nos<el)sg=true
            }
        }
        resp.push({
            mandante,visitante,
            numero:mandante==time?[nos,el]:[el,nos],
            sg
        })
    }
    
    return resp
}