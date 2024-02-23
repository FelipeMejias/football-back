import { createIta1 } from "./adicionadas/p4_ITA.js";
import { createEsp1 } from "./adicionadas/p3_ESP.js";
import { createIng1 } from "./adicionadas/p2_ING.js";
import { createAle1 } from "./adicionadas/p5_ALE.js";
import { createFra1 } from "./adicionadas/p6_FRA.js";

export function buildContext(camp,inteiro=false){
    //if(camp=='bra1')return {partidasTotais:inteiro===true?createBra1:inteiro?extrairPosteriores(createBra1,inteiro):extrairFuturas(createBra1),listaTimes:contextBra1.listaTimes}
    if(camp=='ing1')return {partidasTotais:inteiro===true?createIng1:inteiro?extrairPosteriores(createIng1,inteiro):extrairFuturas(createIng1),listaTimes:contextIng1.listaTimes}
    if(camp=='esp1')return {partidasTotais:inteiro===true?createEsp1:inteiro?extrairPosteriores(createEsp1,inteiro):extrairFuturas(createEsp1),listaTimes:contextEsp1.listaTimes}
    if(camp=='ita1')return {partidasTotais:inteiro===true?createIta1:inteiro?extrairPosteriores(createIta1,inteiro):extrairFuturas(createIta1),listaTimes:contextIta1.listaTimes}
    if(camp=='ale1')return {partidasTotais:inteiro===true?createAle1:inteiro?extrairPosteriores(createAle1,inteiro):extrairFuturas(createAle1),listaTimes:contextAle1.listaTimes}
    if(camp=='fra1')return {partidasTotais:inteiro===true?createFra1:inteiro?extrairPosteriores(createFra1,inteiro):extrairFuturas(createFra1),listaTimes:contextFra1.listaTimes}
    //if(camp=='bra2')return {partidasTotais:inteiro===true?createBra2:inteiro?extrairPosteriores(createBra2,inteiro):extrairFuturas(createBra2),listaTimes:contextBra2.listaTimes}
}
function extrairFuturas(array){
    const resp=[...array]
    for(let k=0;k<array.length;k++){
        if(array[k][1].length!=2){
            resp.shift()
        }else{
            return resp
        }
    }
    return resp
}
function extrairPosteriores(array,manvis){
    const resp=[]
    let podeIr=false
    for(let k=0;k<array.length;k++){
        
        if(podeIr && array[k][1].length==2){
            resp.push(array[k])
        }
        if(array[k][0]==manvis)podeIr=true
    }
    return resp
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
    const contextFra1={
        listaNomes:['Brestois','Clermont','Le Havre','Lens','Lorient-Bretagne','LOSC','Lyon','Metz','Mônaco','Montpellier','Nantes','Nice','Olympique','PSG','Reims','Rennes','Strasbourg','Toulouse'],
        listaTimes:['bre','cle','hav','len','lor','los','lyo','met','mon','mpl','nan','nic','oly','psg','rei','ren','str','tou'],
        path:'fra1'
      }
    const contextBra2={
      listaNomes:['ABC','Atlético GO','Avaí','Botafogo SP','Ceará','Chapecoense','CRB','Criciúma','Guarani','Ituano','Juventude','Londrina','Mirassol','Novorizontino','Ponte Preta','Sampaio Corrêa','Sport','Tombense','Vila Nova','Vitória'],
      listaTimes:['abc','ago','ava','bot','cea','cha','crb','cri','gua','itu','juv','lon','mir','nov','pon','sam','spo','tom','vil','vit'],
      path:'bra2'
    }
export const contexts=[
    contextIng1,contextEsp1,contextIta1,contextAle1,contextFra1
  ]
export  const paths=['ing1','esp1','ita1','ale1','fra1']