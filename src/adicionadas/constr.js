import { buildContext } from "../bancos.js"
import { confEsc } from "../conferencias/confEsc.js"
import { confGols } from "../conferencias/confGols.js"
import { confPlacar } from "../conferencias/confPlacar.js"
import { getPartida } from "../especiais/getPartida.js"
import { acharPar } from "../profundo/dupla.js"
import { criarOrdem } from "../profundo/individual.js"

/*

    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],
    ['','2401'],


*/
export function criarOrdemDuplaAposta(context,camp,mandante,visitante,phase){
    let y='['
    console.log(`==== ${mandante.toUpperCase()} x ${visitante.toUpperCase()} ====`)
    const ordemMandante=criarOrdem(context,mandante,true)
    const ordemVisitante=criarOrdem(context,visitante,true)
    const listaApo=[]
    const listao=[]
    ordemMandante.forEach(est=>{
        const {grandeza,c,asc,estadia,metade,handicap,pos}=est
        if(pos<5){
            const par=acharPar(ordemVisitante,grandeza,c,asc,estadia,metade,handicap)
            if(par){
                if(par.pos<5){
                    
                    const aposta=acharAposta(mandante,visitante,camp,est,par,true)
                    
                    if(aposta){
                        
                        const {texto,valor,chance}=aposta
                        if(!texto)console.log(aposta)
                        let naoTa=true
                        let index=0
                        listaApo.forEach((apo,ind)=>{
                            if(apo.texto==texto){
                                naoTa=false
                            }
                            index++
                        })
                        if(naoTa){
                            let odd=0
                            let odr=1
                            if(phase==2){
                                const {partidasTotais}=buildContext(camp,true)
                                const partola=getPartida(partidasTotais,mandante+visitante)
                                const odds=partola[2]
                                odr=odds[index]
                            }
                            if(phase==1)console.log(aposta.texto)
                            listaApo.push({texto,odd})
                            
                            if(odr){
                                if(phase==2&&odr)y+=`[${odr},${grandeza}${c}${asc}${metade?metade:0},${grandeza==1?0:valor},${chance}],`
                                listao.push({texto,odr})
                            }
                        }
                    }
                }
            }
        }
    })
    y+=']'
    
    if(phase==2){
        console.log(y)
    }
    console.log('===========================')
    return listao
}
export function acharAposta(mand,visi,camp,stat,stat2){
    const context=buildContext(camp)
    const {listaNomes,listaTimes}=contexts[paths.indexOf(camp)]
    const mandante=listaNomes[listaTimes.indexOf(mand)]
    const visitante=listaNomes[listaTimes.indexOf(visi)]
    let texto
    const {grandeza,c,asc,metade,valor:valor1}=stat
    const {valor:valor2,c:ccomp}=stat2
    
    const primMaior=valor1-valor2>0
    const valor=asc?(primMaior?valor1:valor2):(primMaior?valor2:valor1)
    const valorFinal=asc?(valor%1>0.5?Math.ceil(valor)+0.5:Math.floor(valor)+0.5):(valor%1>0.5?Math.floor(valor)+0.5:Math.floor(valor)-0.5)
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
        const cha1=confPlacar(context,1,metade,mand,c,asc,0)
        const cha2=confPlacar(context,2,metade,visi,ccomp,asc,0)
        const chance=parseInt((cha1+cha2)/2)
        return {valor:valorFinal,texto,chance}
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
        const cha1=confGols(context,1,metade,mand,c,asc,valorFinal)
        const cha2=confGols(context,2,metade,visi,ccomp,asc,valorFinal)
        const chance=parseInt((cha1+cha2)/2)
        return {valor:valorFinal,texto,chance}
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
        const cha1=confEsc(context,1,metade,mand,c,asc,valorFinal)
        const cha2=confEsc(context,2,metade,visi,ccomp,asc,valorFinal)
        const chance=parseInt((cha1+cha2)/2)
        return {valor:valorFinal,texto,chance}
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