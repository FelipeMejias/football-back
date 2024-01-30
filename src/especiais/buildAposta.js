import { buildContext } from "../bancos.js"
import { confPlacar } from "../conferencias/confPlacar.js"
import { confGols } from "../conferencias/confGols.js"
import { confEsc } from "../conferencias/confEsc.js"
export function buildApostas(aberto){
    let desordenada=[]
    const camps=[/*'bra1',*/'ing1','esp1','ita1','ale1'/*,'bra2'*/]
    camps.forEach(camp=>{
        desordenada=[...desordenada,...extrairFuturas(camp,aberto)]
    })
    return desordenada
}

function extrairFuturas(camp,aberto){
    const {partidasTotais}=buildContext(camp,true)
    let resp=[]
    let cont=0
    for(let k=0;k<partidasTotais.length;k++){
        if(cont>10)return resp
        const part=partidasTotais[k]
        if(aberto){
            if(part[1].length!=2 && part.length==3){
                cont=0
                const nome=part[0]
                const mandante=nome[0]+nome[1]+nome[2]
                const visitante=nome[3]+nome[4]+nome[5]
                const aps=part[2]
                const lista=repassarApostas(camp,mandante,visitante,aps)
                resp=[...resp,...lista]
            }else{
                cont++
            }
        }else{
            if(part.length==5){
                cont=0
                const nome=part[0]
                const mandante=nome[0]+nome[1]+nome[2]
                const visitante=nome[3]+nome[4]+nome[5]
    
                const aps=part[4]
                const lista=repassarApostas(camp,mandante,visitante,aps,part)
                resp=[...resp,...lista]
            }else{
                cont++
            }
        }
        
    }
    return resp
}

export function repassarApostas(camp,mandante,visitante,aps,part){
    const lista=[]
    for(let aposta of aps){
        const oddRaiz=aposta[0]
        const odd = parseFloat((oddRaiz/100).toFixed(2))
        const info=aposta[1].toString()
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        const valor=aposta[2]
        const texto=darNomeAposta(camp,mandante,visitante,grandeza,c,asc,metade,valor)
        const chance=aposta[3]
        let green=undefined
        if(part){
            
            const context={partidasTotais:[part]}
            if(grandeza==1){
                green=confPlacar(context,0,metade,mandante,c,asc,valor)
            }else if(grandeza==2){
                green=confGols(context,0,metade,mandante,c,asc,valor)
            }else if(grandeza==6){
                green=confEsc(context,0,metade,mandante,c,asc,valor)
            }
        }
        lista.push({
            camp,mandante,visitante,odd,info,valor,texto,chance,green
        })
    }
    return lista
}


export function darNomeAposta(camp,mand,visi,grandeza,c,asc,metade,valorFinal){
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    if(grandeza==1){
        if(!asc){
            if(c==1){
                texto=`${mandante} vencer`
            }else if(c==2){
                return null
            }else if(c==3){
                texto=`${visitante} vencer`
            }
            if(metade==0)texto+=` a partida`
        if(metade==1){
            texto+=` o 1º tempo`
        }
        if(metade==2){
            texto+=` o 2º tempo`
        }
        return texto
        }
        
        
    }else if(grandeza==2){//==============================================================
        if(c==1){
            if(asc){
                texto=`Menos de ${valorFinal} gols para ${mandante}`
            }else{
                texto=`Mais de ${valorFinal} gols para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de ${valorFinal} gols`
            }else{
                texto=`Mais de ${valorFinal} gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de ${valorFinal} gols para ${visitante}`
            }else{
                texto=`Mais de ${valorFinal} gols para ${visitante}`
            }
        }
        if(metade==0)texto+=` na partida`
        if(metade==1)texto+=` no 1º tempo`
        if(metade==2)texto+=` no 2º tempo`
        return texto
    }else if(grandeza==6){
        if(camp=='ing1')return null//============================================================
        if(c==1){
            if(asc){
                texto=`Menos de ${valorFinal} escanteios para ${mandante}`
            }else{
                texto=`Mais de ${valorFinal} escanteios para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de ${valorFinal} escanteios`
            }else{
                texto=`Mais de ${valorFinal} escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de ${valorFinal} escanteios para ${visitante}`
            }else{
                texto=`Mais de ${valorFinal} escanteios para ${visitante}`
            }
        }
        return texto
    }
    return null
}

const contextBra1={
    listaNomes:['América MG','Athlético PR','Atlético MG','Bahia','Botafogo','Bragantino','Corinthians','Coritiba','Cruzeiro','Cuiabá','Flamengo','Fluminense','Fortaleza','Goiás','Grêmio','Internacional','Palmeiras','Santos','São Paulo','Vasco da Gama'],
    listaTimes:['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas'],
    path:'bra1'
  }
  const contextIng1={
    listaNomes:['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Burnley','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Luton Town','Manchester City','Manchester United','Newcastle','Nottingham Forest','Sheffield United','Tottenham','West Ham','Wolverhampton'],
    listaTimes:['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','cit','man','new','not','she','tot','wes','wol'],
    path:'ing1'
  }
  const contextEsp1={
    listaNomes:['Alavés','Almeria','Athletico Bilbao','Athletico Madrid','Barcelona','Bétis','Cádiz','Celta de Vigo','Getafe','Girona','Granada','Las Palmas','Mallorca','Osasuna','Rayo Vallecano','Real Madrid','Real Sociedad','Sevilla','Valencia','Villareal'],
    listaTimes:['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil'],
    path:'esp1'
  }
    const contextIta1={
      listaNomes:['Atalanta','Bologna','Cagliari','Empoli','Fiorentina','Frosinone','Genoa','Inter','Juventus','Lazio','Lecce','Milan','Monza','Napoli','Roma','Salernitana','Sassuolo','Torino','Udinese','Verona'],
      listaTimes:['ata','bol','cag','emp','fio','fro','gen','int','juv','laz','lec','mil','mon','nap','rom','sal','sas','tor','udi','ver'],
      path:'ita1'
    }
    const contextAle1={
      listaNomes:['Augsburg','Bayern','Bochum','Borussia','Colônia','Darmstadt','Eintracht','Freiburg','Heidenheim','Hoffenheim','Leipzig','Leverkusen','Mainz','Mönchengladbach','Stuttgart','Union Berlin','Werder Bremen','Wolfsburg'],
      listaTimes:['aug','bay','boc','bor','col','dar','ein','fre','hei','hof','lei','lev','mai','mon','stu','uni','wer','wol'],
      path:'ale1'
    }
    const contextBra2={
      listaNomes:['ABC','Atlético GO','Avaí','Botafogo SP','Ceará','Chapecoense','CRB','Criciúma','Guarani','Ituano','Juventude','Londrina','Mirassol','Novorizontino','Ponte Preta','Sampaio Corrêa','Sport','Tombense','Vila Nova','Vitória'],
      listaTimes:['abc','ago','ava','bot','cea','cha','crb','cri','gua','itu','juv','lon','mir','nov','pon','sam','spo','tom','vil','vit'],
      path:'bra2'
    }
  const contexts=[
    contextBra1,contextIng1,contextEsp1,contextIta1,contextAle1,contextBra2
  ]
  const paths=['bra1','ing1','esp1','ita1','ale1','bra2']