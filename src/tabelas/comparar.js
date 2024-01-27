import filtrar, { elPushar } from "../especiais/filtrarPartidas.js"

export  function comparar(context,handicap){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    for(let time of listaTimes){
        let fez=0
        let nada=0
        let tomou=0
        const partidas=filtrar(partidasTotais,time,0)
        for(let partida of partidas){
            const nome=partida[0]
            const mandante=nome[0]+nome[1]+nome[2]
            const timeEhMandante=mandante==time
            const gols=partida[2]
            let nosso=0
            let deles=0
            let participaDaContagem=false
            for(let k=0;k<=gols.length;k++){
                let situ=nosso-deles
                if(situ>1){
                    situ=1
                }else if(situ<-1){
                    situ=-1
                }
                if(situ==handicap){
                    participaDaContagem=true
                    if(!gols[k]){
                        nada++;
                    }else if(timeEhMandante?gols[k]<0:gols[k]>0){
                        tomou++;
                    }else{
                        fez++;
                    }
                }
                if(gols[k]){
                    if(timeEhMandante?gols[k]<0:gols[k]>0){
                        deles++
                    }else{nosso++}
                }
            }
        }
        const cont=fez+nada+tomou
        const elemento=elPushar(time,fez,nada,tomou,cont,0,true)
        resp.push(elemento)
    }
    return resp
}