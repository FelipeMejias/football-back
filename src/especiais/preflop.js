import { ligas } from "../bancos.js"
export function nomePreFlop(mand,visi,camp,stat){
    const {contexts,paths}=ligas
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    const {grandeza,c,asc,metade}=stat
    if(grandeza==1){
        if(!asc){
            if(c==1){
                texto=`${mandante} vencer`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${visitante} vencer`
            }
        }else{
            if(metade!=0)return null
            if(c==1){
                texto=`${visitante} vencer ou empatar`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${mandante} vencer ou empatar`
            }  
        }
        if(metade==0)texto+=` a partida`
        if(metade==1){
            texto+=` o 1º tempo`
        }
        if(metade==2){
            texto+=` o 2º tempo`
        }
        return texto
    }else if(grandeza==2){
        if(c==1){
            if(asc){
                texto=`Poucos gols para ${mandante}`
            }else{
                texto=`Muitos gols para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Poucos gols`
            }else{
                texto=`Muitos gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Poucos gols para ${visitante}`
            }else{
                texto=`Muitos gols para ${visitante}`
            }
        }
        if(metade==0)texto+=` na partida`
        if(metade==1)texto+=` no 1º tempo`
        if(metade==2)texto+=` no 2º tempo`
        return texto
    }else if(grandeza==6){
        if(c==1){
            if(asc){
                texto=`Poucos escanteios para ${mandante}`
            }else{
                texto=`Muitos escanteios para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Poucos escanteios`
            }else{
                texto=`Muitos escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Poucos escanteios para ${visitante}`
            }else{
                texto=`Muitos escanteios para ${visitante}`
            }
        }
        return texto
    }else if(grandeza==7){
        if(c==1){
            if(asc){
                return null
            }else{
                texto=`${mandante} marca primeiro`
            }
        }else if(c==3){
            if(asc){
                return null
            }else{
                texto=`${visitante} marca primeiro`
            }
        }
        return texto
    }else if(grandeza==8){
        if(c==1){
            if(asc){
                return null
            }else{
                texto=`${mandante} marca por último`
            }
        }else if(c==3){
            if(asc){
                return null
            }else{
                texto=`${visitante} marca por último`
            }
        }
        return texto
    }
    return null
}