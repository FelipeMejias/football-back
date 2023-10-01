export  function classificacao(context,rodada,camp){
    const {partidasTotais,listaTimes}=context
    const resp=[]
    let cont
    for(let time of listaTimes){
        const partidas=partidasTotais.filter(part=>((part.mandante===time||part.visitante===time)&&part.rodada<=rodada))
        let vitorias=0;let golsPro=0;
        let empates=0
        let derrotas=0;let golsContra=0;
        cont=0
        for(let partida of partidas){
            let nosso=0
            let deles=0
            const gols=partida.gols
            for(let gol of gols){
                if(partida.mandante==time?gol.mandante:!gol.mandante){
                    nosso++;golsPro++
                }else{
                    deles++;golsContra++
                }
            }
            if(nosso>deles){vitorias++}else if(nosso<deles){derrotas++}else{empates++}
            cont++
        }
        const pontos=vitorias*3+empates
        resp.push({time,
            pontos,
            partidas:cont,
            vitorias,
            empates,
            derrotas,
            golsPro,
            golsContra,
            saldoGols:golsPro-golsContra
        })
    }
    return ordenarClassificacao(resp,camp=='bra1'||camp=='bra2')
}
function ordenarClassificacao(arr,brazuca){
    let using;const resp=[];const hash={}
    for(let k=0;k<arr.length;k++){
        const {time,pontos,vitorias,saldoGols,golsPro}=arr[k]
        hash[time]=[pontos,vitorias,saldoGols,golsPro]
    }
    let maior;
    for(let k=0;k<arr.length;k++){
        maior={pontos:-Infinity};using=null
        for(let c=0;c<arr.length;c++){
            const l=hash[arr[c].time]
            if(!l)continue;
           if(l[0]>maior.pontos){
            using=c
            maior=arr[c]
           }else if(l[0]==maior.pontos){
                if(brazuca?l[1]>maior.vitorias:l[2]>maior.saldoGols){
                    using=c
                    maior=arr[c]
                }else if(brazuca?l[1]==maior.vitorias:l[2]==maior.saldoGols){
                    if(brazuca?l[2]>maior.saldoGols:l[3]>maior.golsPro){
                        using=c
                        maior=arr[c]
                    }else if(brazuca?l[2]==maior.saldoGols:l[3]==maior.golsPro){
                        if(brazuca?l[3]>maior.golsPro:l[1]>maior.vitorias){
                            using=c
                            maior=arr[c]
                        }else if(l[1]==maior.vitorias){
                        }
                    }
                }
           }
        }
        hash[arr[using].time]=false
        resp.push({posicao:k+1,...maior})
    }
    return resp
}