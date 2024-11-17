import { createIta1 } from "./adicionadas/guardado/l_ITA.js";
import { createEsp1 } from "./adicionadas/guardado/k_ESP.js";
import { createIng1 } from  "./adicionadas/i_ING.js";
import { createAle1 } from "./adicionadas/j_ALE.js";
import { createFra1 } from "./adicionadas/m_FRA.js";
import { createHol1 } from "./adicionadas/guardado/n_HOL.js";
import { createPor1 } from "./adicionadas/guardado/o_POR.js";

import { createBra1 } from "./adicionadas/a_BRA.js";
import { createArg1 } from "./adicionadas/guardado/b_ARG.js";
import { createEua1 } from "./adicionadas/guardado/d_EUA.js";
import { createBra2 } from "./adicionadas/e_BRA2.js";
import { createJap1 } from "./adicionadas/guardado/f_JAP.js";
import { createKor1 } from "./adicionadas/guardado/g_KOR.js";
import { createUru1 } from "./adicionadas/guardado/c_URU.js";
import { createSue1 } from "./adicionadas/guardado/h_SUE.js";
export const menorOdd=1.3
export const maiorOdd=3
export function buildContext(camp,inteiro=false){
  const {paths,contexts,bancos}=ligas
  const index=paths.indexOf(camp)
  const banco=bancos[index]
  if(!contexts[index])console.log(camp)
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
    const contextIng1antigo={
      listaNomes:['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Burnley','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Luton Town','Manchester City','Manchester United','Newcastle','Nottingham Forest','Sheffield United','Tottenham','West Ham','Wolverhampton'],
      listaTimes:['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','cit','man','new','not','she','tot','wes','wol'],
      path:'ing1'
    }
    const contextIng1={
      listaNomes:['Arsenal','Aston Villa','Bournemouth','Brentford','Brighton','Ipswich Town','Chelsea','Crystal Palace','Everton','Fulham','Liverpool','Leicester','Manchester City','Manchester United','Newcastle','Nottingham Forest','Southampton','Tottenham','West Ham','Wolverhampton'],
      listaTimes:['ars','ast','bou','bre','bri','ips','che','cry','eve','ful','liv','lei','cit','man','new','not','sou','tot','wes','wol'],
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

    const contextAle1antigo={
      listaNomes:['Augsburg','Bayern','Bochum','Borussia','Colônia','Darmstadt','Eintracht','Freiburg','Heidenheim','Hoffenheim','Leipzig','Leverkusen','Mainz','Mönchengladbach','Stuttgart','Union Berlin','Werder Bremen','Wolfsburg'],
      listaTimes:['aug','bay','boc','bor','col','dar','ein','fre','hei','hof','lei','lev','mai','mon','stu','uni','wer','wol'],
      path:'ale1'
    }
    const contextAle1={
      listaNomes:['Augsburg','Bayern','Bochum','Borussia','Holstein Kiel','St. Pauli','Eintracht','Freiburg','Heidenheim','Hoffenheim','Leipzig','Leverkusen','Mainz','Mönchengladbach','Stuttgart','Union Berlin','Werder Bremen','Wolfsburg'],
      listaTimes:['aug','bay','boc','bor','hol','stp','ein','fre','hei','hof','lei','lev','mai','mon','stu','uni','wer','wol'],
      path:'ale1'
    }
    

    const contextFra1antigo={
      listaNomes:['Brestois','Clermont','Le Havre','Lens','Lorient-Bretagne','LOSC','Lyon','Metz','Mônaco','Montpellier','Nantes','Nice','Olympique','PSG','Reims','Rennes','Strasbourg','Toulouse'],
      listaTimes:['bre','cle','hav','len','lor','los','lyo','met','mon','mpl','nan','nic','oly','psg','rei','ren','str','tou'],
      path:'fra1'
    }
    const contextFra1={
      listaNomes:['Brestois','Angers','Auxerre','Le Havre','Lens','Lille','Lyon','Saint-Étienne','Mônaco','Montpellier','Nantes','Nice','Olympique','PSG','Reims','Rennes','Strasbourg','Toulouse'],
      listaTimes:['bre','ang','aux','hav','len','los','lyo','ste','mon','mpl','nan','nic','oly','psg','rei','ren','str','tou'],
      path:'fra1'
    }

    const contextHol1={
      listaNomes:['Ajax','Almere','AZ','Escelsior','Feyenoord','Fortuna Sittard','Go Ahead Eagles','Heerenveen','Heracles','NEC','PSV','RKC','Sparta Roterdã','Twente','Utrecht','Vitesse','Volendam','Zwolle'],
      listaTimes:['aja','alm','azz','exc','fey','for','goa','hee','her','nec','psv','rkc','spa','twe','utr','vit','vol','zwo'],
      path:'hol1'
    }
    const contextPor1={
      listaNomes:['Arouca','Benfica','Boavista','Braga','Casa Pia','Chaves','Estoril','Estrela Amadora','Famalicão','Farense','Gil Vicente','Moreirense','Portimonense','Porto','Rio Ave','Sporting','Vitória SC','Vizela'],
      listaTimes:['aro','ben','boa','bra','cas','cha','est','ama','fam','far','gil','mor','ptm','por','rio','spo','vit','viz'],
      path:'por1'
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
  const contextBra1={
    listaNomes:['Atlético GO','Athlético PR','Atlético MG','Criciúma','Bahia','Botafogo','Bragantino','Corinthians','Cruzeiro','Cuiabá','Flamengo','Fluminense','Fortaleza','Grêmio','Internacional','Juventude','Palmeiras','São Paulo','Vasco da Gama','Vitória'],
    listaTimes:['ago','cap','cam','cri','bah','bot','bra','cor','cru','cui','fla','flu','for','gre','int','juv','pal','sao','vas','vit'],
    path:'bra1'
  }
  const contextEua1={
    listaNomes:['Atlanta United','Austin','Columbus Crew','Charlote FC','Chicago Fire',
    'Cincinnati','Colorado Rapids','FC Dallas','DC United','Houston Dynamo',
    'Inter Miami','LAFC','LA Galaxy','Minnesota Union','Montréal',
    'Nashville SC','New England','New York City FC','Orlando City','Philadelphia Union',
    'Portland Timbers','Real Salt Lake','NY Red Bulls','San José','Seattle Sounders',
    'St Louis City','Sporting KC','Toronto','Whitecaps',],
    listaTimes:['atl','aus','ccc','cha','chi',
    'cin','col','dal','dcu','hou',
    'int','laf','lag','min','mon',
    'nas','new','nyc','orl','phi',
    'por','rea','red','san','sea',
    'slc','spo','tor','whi',],
    path:'eua1'
  }
  const contextBra2={
    listaNomes:['Amazonas FC','América MG','Avaí','Botafogo SP','Brusque','Ceará','Chapecoense','Coritiba','CRB','Goiás',
    'Guarani','Ituano','Mirassol','Novorizontino','Operário','Paysandu','Ponte Preta','Santos','Sport Recife','Vila Nova'],
    listaTimes:['ama','amg','ava','bot','bru','cea','cha','cor','crb','goi',
                'gua','itu','mir','nov','ope','pay','pon','san','spo','vil'],
    path:'bra2'
  }
  const contextJap1={
    listaNomes:['Albirex Nigata','Kashiwa Antlers','Avispa','Cerezo Osaka','Consadole Sapporo','Frontale','Gamba Osaka','Júbilo Iwata','Kashiwa Reysol','Kyoto Sanga',
          'Machida Zelvia','Nagoya Grampus','Sagan Tosu','Sanfrecce Hiroshima','Shonan','FC Tokyo','Urawa Reds','Tokyo Verdy','Vissel Kobe','Yokohama Marinos'],
    listaTimes:[ 'alb','ant','avi','cer','con','fro','gam','jub','kas','kyo',
      'mac','nag','sag','san','sho','tok','ura','ver','vis','yok',],
    path:'jap1'
  }
  const contextKor1={
    listaNomes:['Daegu','Daejon Citizen','Gangwon','Gimcheon Sangmu','Gwangju FC','Incheon United','Jeju United','Jeonbuk Hyundai','Seoul','Steelers','Suwon','Ulsan Hyundai'],
    listaTimes:['dae','djc','gan','gim','gwa','inc','jej','jeo','seo','ste','suw','uls'],
    path:'kor1'
  }
  const contextUru1={
    listaNomes:['Boston River','Cerro','Danubio','Defensor','Deportivo Maldonado','Fênix','Cerro Largo','Liverpool',
        'Miramar Misiones','Montevideo Wanderers','Nacional','Peñarol','Progreso','Racing','Rampla','River Plate'],
    listaTimes:['bos','cer','dan','def','dep','fen','lar','liv',
        'mir','mon','nac','pen','pro','rac','ram','riv'],
    path:'uru1'
  }
  const contextSue1={
    listaNomes:['AIK','Brommapojkarna','Djurgarden','Elfsborg','GAIS','Gotemburgo','Hacken','Halmstad',
          'Hammarby','Kalmar','Malmo','Mjallby','Norrkoping','Sirius','Varnamo','Vasteras'],
    listaTimes:['aik','bro','dju','elf','gai','got','hac','hal',
          'ham','kal','mal','mja','nor','sir','var','vas'],
    path:'sue1'
  }
export const ligas={
  paths:[
    'bra1',//'arg1','uru1','eua1',
    'bra2',//'jap1','kor1','sue1',
    'ing1','ale1',//'esp1','ita1',
    //'fra1',//'hol1','por1'
  ],
  contexts:[
    contextBra1,//contextArg1,contextUru1,contextEua1,
    contextBra2,//contextJap1,contextKor1,contextSue1,
    contextIng1,contextAle1,//contextEsp1,contextIta1,
    //contextFra1,//contextHol1,contextPor1,
    ],
  bancos:[
    createBra1,//createArg1,createUru1,createEua1,
    createBra2,//createJap1,createKor1,createSue1,
    createIng1,createAle1,//createEsp1,createIta1,
    //createFra1,//createHol1,createPor1,
  ]
  }
