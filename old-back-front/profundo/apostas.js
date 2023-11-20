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
export function acharAposta(mand,visi,camp,stat,stat2){
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    const {grandeza,c,asc,metade,valor:valor1}=stat
    const {valor:valor2}=stat2
    const primMaior=valor1-valor2>0
    const valor=asc?(primMaior?valor1:valor2):(primMaior?valor2:valor1)
    const valorFinal=asc?(valor%1>0.5?Math.ceil(valor)+0.5:Math.floor(valor)+0.5):(valor%1>0.5?Math.floor(valor)+0.5:Math.floor(valor)-0.5)
    if(grandeza==1){
        if(c==1){
            if(asc){
                texto=`${visitante} vencer ou empatar`
            }else{
                texto=`${mandante} vencer`
            }
        }else if(c==2){
            if(asc){
                texto=`${mandante} ou ${visitante} vencerem`
            }else{
                texto=`Empatar`
            }
        }else if(c==3){
            if(asc){
                texto=`${mandante} vencer ou empatar`
            }else{
                texto=`${visitante} vencer`
            }
        }
        if(metade==0)texto+=` a partida`
        if(metade==1){
            if(asc)return null
            texto+=` o 1º tempo`
        }
        if(metade==2){
            if(asc)return null
            texto+=` o 2º tempo`
        }
        return {valor:valorFinal,texto}
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
        return {valor:valorFinal,texto}
    }else if(grandeza==6){//============================================================
        if(c==1){
            if(camp!='bra1')return null
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
            if(camp!='bra1')return null
            if(asc){
                texto=`Menos de ${valorFinal} escanteios para ${visitante}`
            }else{
                texto=`Mais de ${valorFinal} escanteios para ${visitante}`
            }
        }
        return {valor:valorFinal,texto}
    }
    return null
}
export function textoAposta(camp,mand,visi,grandeza,c,asc,metade,valorFinal){
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    if(grandeza==1){
        if(c==1){
            if(asc){
                texto=`${visitante} vencer ou empatar`
            }else{
                texto=`${mandante} vencer`
            }
        }else if(c==2){
            if(asc){
                texto=`${mandante} ou ${visitante} vencerem`
            }else{
                texto=`Empatar`
            }
        }else if(c==3){
            if(asc){
                texto=`${mandante} vencer ou empatar`
            }else{
                texto=`${visitante} vencer`
            }
        }
        if(metade==0)texto+=` a partida`
        if(metade==1){texto+=` o 1º tempo`}
        if(metade==2){texto+=` o 2º tempo`}
        return texto
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
    }else if(grandeza==6){//============================================================
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

