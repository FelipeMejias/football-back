import { createIta1 } from "./adicionadas/p4_ITA.js";
import { createEsp1 } from "./adicionadas/p3_ESP.js";
import { createIng1 } from "./adicionadas/p2_ING.js";
import { createAle1 } from "./adicionadas/p5_ALE.js";
import { createFra1 } from "./adicionadas/p6_FRA.js";
import { createAra1 } from "./adicionadas/p7_ARA.js";
import { createArg1 } from "./adicionadas/p8_ARG.js";
import { createHol1 } from "./adicionadas/p9_HOL.js";

export function buildContext(camp,inteiro=false){
  const {paths,contexts,bancos}=ligas
  const index=paths.indexOf(camp)
  const banco=bancos[index]
  return {
    partidasTotais:inteiro===true?banco:inteiro?extrairPosteriores(banco,inteiro):extrairFuturas(banco),
    listaTimes:contexts[index].listaTimes
  }
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
    const contextHol1={
      listaNomes:['Ajax','Almere','AZ','Escelsior','Feyenoord','Fortuna Sittard','Go Ahead Eagles','Heerenveen','Heracles','NEC','PSV','RKC','Sparta Roterdã','Twente','Utrecht','Vitesse','Volendam','Zwolle'],
      listaTimes:['aja','alm','azz','exc','fey','for','goa','hee','her','nec','psv','rkc','spa','twe','utr','vit','vol','zwo'],
      path:'hol1'
    }
    const contextAra1={
      listaNomes:['Abha','Al-Ahli','Al Akhdoud','Dhamk','Al Ettifaq','Al Fateh','Al Feiha','Al Hazm','Al-Hilal','Al-Ittihad','Al Khaleej','Al-Nassr','Al-Raed','Al-Riyadh','Al-Shabab','Al Taawon','Al Taee','Al Wehda'],
      listaTimes:['abh','ahl','akh','dha','ett','fat','fei','haz','hil','itt','kha','nas','rae','riy','sha','taa','tae','weh'],
      path:'ara1'
    }
    const contextArg1={
      listaNomes:['Argentinos Juniors','Banfield','Barracas Central','Belgrano','Boca Juniors','Central Córdoba','Defensa y Justicia','Deportivo Riestra','Estudiantes','Gimnasia','Godoy Cruz','Huracán','Independiente','Instituto','Independente Rivadavia','Lanús',`Newell's Old Boys`,'Platense','Racing','River Plate','Rosario','San Lorenzo','Sarmiento','Talleres','Tigres','Tucuman','Unión de Santa Fe','Vélez Sársfield'],
      listaTimes:['arg','ban','bar','bel','boc','cen','def','dep','est','gim','god','hur','ind','ins','iri','lan','new','pla','rac','riv','ros','san','sar','tal','tig','tuc','uni','vel'],
      path:'arg1'
  }
export const ligas={
  paths:['ing1','ita1','ale1','fra1','esp1','hol1','ara1','arg1'],
  contexts:[contextIng1,contextIta1,contextAle1,contextFra1,contextEsp1,contextHol1,contextAra1,contextArg1],
  bancos:[createIng1,createIta1,createAle1,createFra1,createEsp1,createHol1,createAra1,createArg1]
}