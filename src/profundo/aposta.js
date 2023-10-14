export function acharAposta(stat){
    let texto
    const {grandeza,c,asc,metade,valor}=stat

    if(grandeza==1){
        if(c==1){
            if(asc){
                texto='Visitante vencer ou empatar'
            }else{
                texto='Mandante vencer'
            }
        }else if(c==2){
            if(asc){
                texto='Mandante ou visitante vencerem'
            }else{
                texto='Empatar'
            }
        }else if(c==3){
            if(asc){
                texto='Mandante vencer ou empatar'
            }else{
                texto='Visitante vencer'
            }
        }
        if(metade==0)texto+=' a partida'
        if(metade==1)texto+=' o 1º tempo'
        if(metade==2)texto+=' o 2º tempo'
        return {texto,odd:gerarOdd()}
    }

    if(grandeza==2){
        if(c==1){
            if(asc){
                texto=`Menos de ${Math.ceil(valor)+0.5} gols para mandante`
            }else{
                texto=`Mais de ${Math.floor(valor)-0.5} gols para mandante`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de ${Math.ceil(valor)+0.5} gols`
            }else{
                texto=`Mais de ${Math.floor(valor)-0.5} gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de ${Math.ceil(valor)+0.5} gols para visitante`
            }else{
                texto=`Mais de ${Math.floor(valor)-0.5} gols para visitante`
            }
        }
        if(metade==0)texto+=' na partida'
        if(metade==1)texto+=' no 1º tempo'
        if(metade==2)texto+=' no 2º tempo'
        return {texto,odd:gerarOdd()}
    }

    if(grandeza==6){
        if(c==1){
            if(asc){
                texto=`Menos de ${Math.ceil(valor)+0.5} escanteios para mandante`
            }else{
                texto=`Mais de ${Math.floor(valor)-0.5} escanteios para mandante`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de ${Math.ceil(valor)+0.5} escanteios`
            }else{
                texto=`Mais de ${Math.floor(valor)-0.5} escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de ${Math.ceil(valor)+0.5} escanteios para visitante`
            }else{
                texto=`Mais de ${Math.floor(valor)-0.5} escanteios para visitante`
            }
        }
        return {texto,odd:gerarOdd()}
    }

    if(grandeza==7){
        if(c==1){
            if(asc){
                texto='Visitante marca o primeiro gol'
            }else{
                texto='Mandante marca o primeiro gol'
            }
        }else if(c==2){
            if(asc){
                texto='Mais de 0.5 gols na partida'
            }else{
                texto='Resultado 0-0'
            }
        }else if(c==3){
            if(asc){
                texto='Mandante marca o primeiro gol'
            }else{
                texto='Visitante marca o primeiro gol'
            }
        }
        return {texto,odd:gerarOdd()}
    }

    return null
}

function gerarOdd(){
    return ((Math.floor(Math. random() * (202)) + 101)/100).toFixed(2)
}