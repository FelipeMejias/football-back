import { buildContext } from "../bancos.js"
import { getPartida } from "../especiais/getPartida.js"

export function buscarApostasJogo(camp,mandante,visitante){
    const {partidasTotais}=buildContext(camp,true)
    const partida=getPartida(partidasTotais,mandante+visitante)
    const odr=partida.length==3?partida[2]:partida[4]
    if(!odr)return []
    const apostas=[]

    for(let caso of odr){
        const lis=caso.split('-')
        const info=lis[0]
        const num=lis[1]
        const grandeza=parseInt(info[0])
        const c=parseInt(info[1])
        const asc=parseInt(info[2])
        const metade=parseInt(info[3])
        const texto=darNomeAposta(camp,mandante,visitante,grandeza,c,asc,metade)
        let odd
        if(grandeza==1){
            odd=(num/100).toFixed(2)
        }else{
            odd=[]
            const zerado=num.length%3==0
            let qtd=zerado?0:parseInt(num[0])
            for(let k=zerado?0:1;k<num.length;k+=3){
                const o=(`${num[k]}${num[k+1]}${num[k+2]}`/100).toFixed(2)
                odd.push({q:qtd,o,t:`${asc?'Menos de ':'Mais de '}${qtd}`})
                qtd++
            }
        }
        apostas.push({info,texto,odd})
    }
    return apostas
}
function darNomeAposta(camp,mand,visi,grandeza,c,asc,metade){
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
                texto=`Menos de X gols para ${mandante}`
            }else{
                texto=`Mais de X gols para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de X gols`
            }else{
                texto=`Mais de X gols`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de X gols para ${visitante}`
            }else{
                texto=`Mais de X gols para ${visitante}`
            }
        }
        if(metade==0)texto+=` na partida`
        if(metade==1)texto+=` no 1º tempo`
        if(metade==2)texto+=` no 2º tempo`
        return texto
    }else if(grandeza==6){
        if(c==1){
            if(asc){
                texto=`Menos de X escanteios para ${mandante}`
            }else{
                texto=`Mais de X escanteios para ${mandante}`
            }
        }else if(c==2){
            if(asc){
                texto=`Menos de X escanteios`
            }else{
                texto=`Mais de X escanteios`
            }
        }else if(c==3){
            if(asc){
                texto=`Menos de X escanteios para ${visitante}`
            }else{
                texto=`Mais de X escanteios para ${visitante}`
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