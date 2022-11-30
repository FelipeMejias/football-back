import { bancoWc, createFuturo } from "../bancos.js";

const auxiliar=[];export let idCopa=0
function ordenarCopa(matches){
    let maior;const used=[];let inuse
    for(let k=0;k<matches.length;k++){
       maior={data:-Infinity}
       inuse=null
       for(let t=0;t<matches.length;t++){
          if(matches[t].data>maior.data&&!used.includes(t)){
             inuse=t
             maior=matches[t]
          }
       }
       bancoWc.push(maior)
       used.push(inuse)
    }
 }
async function createCopa(torneio,data,times,goals){
    if(!times)return;
    idCopa++
    const id=idCopa
    const mandante=times[0]+times[1]+times[2]
    const visitante=times[3]+times[4]+times[5]
    const gols=[]
    
    for(let goal of goals){
       if(goal>=0){
           gols.push({mandante:true,minuto:goal})
       }else{
          gols.push({mandante:false,minuto:-goal})
       }
    }
    const part=r?{id,data,torneio,mandante,visitante,gols,rodada:r}:{id,data,torneio,mandante,visitante,gols}
    auxiliar.push(part)
 }
 export async function createWcFuturo(){
   let rod=2
   //await createFuturo(rod,'2211281000','corgan')
 }
   
 let r=false
export async function createWc(){
    let tor='c22'
    r=1
    await createCopa(tor,'221120','catequ',[-16,-31])
    await createCopa(tor,'221121','ingira',[35,43,45,62,-65,71,90,-90])
    await createCopa(tor,'221121','senhol',[-84,-90])
    await createCopa(tor,'221121','euagal',[36,-82])
    await createCopa(tor,'221122','argara',[10,-48,-53])
    await createCopa(tor,'221122','dintun',[])
    await createCopa(tor,'221122','mexpol',[])
    await createCopa(tor,'221122','fraaus',[-9,27,32,68,71])
    await createCopa(tor,'221123','marcro',[])
    await createCopa(tor,'221123','alejap',[33,-75,-83])
    await createCopa(tor,'221123','espcrc',[11,21,31,54,74,90,90])
    await createCopa(tor,'221123','belcan',[44])
    await createCopa(tor,'221124','suicam',[48])
    await createCopa(tor,'221124','urucor',[])
    await createCopa(tor,'221124','porgan',[65,-73,78,80,-89])
    await createCopa(tor,'221124','braser',[62,73])
    r=2
    await createCopa(tor,'221125','galira',[-90,-90])
    await createCopa(tor,'221125','catsen',[-41,-48,78,-84])
    await createCopa(tor,'221125','holequ',[6,-49])
    await createCopa(tor,'221125','ingeua',[])
    await createCopa(tor,'221126','argmex',[74,87])
    await createCopa(tor,'221126','tunaus',[-23])
    await createCopa(tor,'221126','polara',[39,82])
    await createCopa(tor,'221126','fradin',[61,-68,86])
    await createCopa(tor,'221126','japcrc',[-81])
    await createCopa(tor,'221126','belmar',[-73,-90])
    await createCopa(tor,'221127','crocan',[-2,36,44,70,90])
    await createCopa(tor,'221127','espale',[62,-83])
    await createCopa(tor,'221128','camser',[29,-45,-45,-53,63,66])
    await createCopa(tor,'221128','corgan',[-24,-34,58,61,-68])
    await createCopa(tor,'221128','brasui',[83])
    await createCopa(tor,'221128','poruru',[54,90])
    await createCopa(tor,'221129','equsen',[-44,67,-70])
    await createCopa(tor,'221129','holcat',[26,49])
    await createCopa(tor,'221129','iraeua',[-38])
    await createCopa(tor,'221129','galing',[-50,-51,-68])
    await createCopa(tor,'221130','tunfra',[58])
    await createCopa(tor,'221130','ausdin',[60])
   r=false
    //================== CATAR =====================//
    tor='ami'
    await createCopa(tor,'220923','catcan',[-4,-13])
    await createCopa(tor,'211111','sercat',[45,51,53,83])
    await createCopa(tor,'211009','porcat',[37,48,90])
    await createCopa(tor,'210904','catpor',[-23,-24,61,-88])
    await createCopa(tor,'210901','catser',[-2,-18,-60,-85])
    await createCopa(tor,'190605','bracat',[16,24])
    tor='tor'
    await createCopa(tor,'210729','cateua',[-86])
    await createCopa(tor,'191205','aracat',[28])
    await createCopa(tor,'190623','catarg',[-4,-82])
    await createCopa(tor,'190201','japcat',[-12,-27,69,-83])
    await createCopa(tor,'190125','corcat',[-78])
    await createCopa(tor,'190117','aracat',[-45,-80])
    //================== EQUADOR =====================//
    tor='ami'
    await createCopa(tor,'220927','japequ',[])
    await createCopa(tor,'220923','araequ',[])
    await createCopa(tor,'220605','mexequ',[])
    await createCopa(tor,'211027','mexequ',[-2,6,-15,59,-75])
    await createCopa(tor,'191013','equarg',[-20,-27,-32,49,-66,-82,-86])
    await createCopa(tor,'190609','mexequ',[28,-47,63,-66,77])
    await createCopa(tor,'190321','euaequ',[81])
    tor='eli'
    await createCopa(tor,'220329','equarg',[-24,90])
    await createCopa(tor,'220127','equbra',[-6,75])
    await createCopa(tor,'210909','uruequ',[90])
    await createCopa(tor,'210604','braequ',[65,90])
    await createCopa(tor,'201013','equuru',[15,45,52,75,-84,-90])
    await createCopa(tor,'201008','argequ',[13])
    tor='tor'
    await createCopa(tor,'210703','argequ',[40,84,90])
    await createCopa(tor,'210627','braequ',[37,-53])
    await createCopa(tor,'190624','equjap',[-15,35])
    await createCopa(tor,'190616','uruequ',[6,33,44,78])
    //================== SENEGAL =====================//
    tor='ami'
    await createCopa(tor,'220927','senira',[55,-64])
    await createCopa(tor,'201009','marsen',[10,71,86,-88])
    tor='tor'
    await createCopa(tor,'190714','sentun',[90])
    tor='c18'
    await createCopa(tor,'180624','japsen',[-11,34,-71,78])
    await createCopa(tor,'180619','polsen',[-37,-60,86])
    //================== HOLANDA =====================//
    tor='ami'
    await createCopa(tor,'220329','holale',[-45,68])
    await createCopa(tor,'220326','holdin',[16,-20,29,37,-47,71])
    await createCopa(tor,'181016','belhol',[5,-27])
    tor='eli'
    await createCopa(tor,'190906','alehol',[9,-59,-66,73,-79,-90])
    await createCopa(tor,'190324','holale',[-15,-34,48,63,-90])
    tor='tor'
    await createCopa(tor,'220925','holbel',[73])
    await createCopa(tor,'220922','polhol',[-13,-60])
    await createCopa(tor,'220614','holgal',[17,23,-26,-90,90])
    await createCopa(tor,'220611','holpol',[-18,-49,51,54])
    await createCopa(tor,'220608','galhol',[-50,90,-90])
    await createCopa(tor,'220603','belhol',[-40,-51,-61,-65,90])
    await createCopa(tor,'201118','polhol',[5,-77,-84])
    await createCopa(tor,'200904','holpol',[61])
    await createCopa(tor,'181119','alehol',[9,19,-85,-90])
    await createCopa(tor,'181116','holfra',[44,90])
    await createCopa(tor,'181013','holale',[30,86,90])
    await createCopa(tor,'180909','frahol',[14,-67,74])
    //================== INGLATERRA =====================//
    tor='ami'
    await createCopa(tor,'220326','ingsui',[-22,45,78])
    await createCopa(tor,'181115','ingeua',[25,27,77])
    await createCopa(tor,'180911','ingsui',[54])
    tor='eli'
    await createCopa(tor,'210908','poling',[-72,90])
    await createCopa(tor,'210331','ingpol',[19,-58,85])
    tor='tor'
    await createCopa(tor,'220926','ingale',[-52,-67,71,75,83,-87])
    await createCopa(tor,'220607','aleing',[50,-88])
    await createCopa(tor,'210707','ingdin',[-30,39,-104])
    await createCopa(tor,'210629','ingale',[75,86])
    await createCopa(tor,'210613','ingcro',[57])
    await createCopa(tor,'201115','beling',[10,24])
    await createCopa(tor,'201014','ingdin',[-35])
    await createCopa(tor,'201011','ingbel',[-16,39,64])
    await createCopa(tor,'200908','dining',[])
    await createCopa(tor,'181118','ingcro',[-57,78,85])
    await createCopa(tor,'181015','esping',[-16,-38,-29,58,90])
    await createCopa(tor,'181012','croing',[])
    await createCopa(tor,'180908','ingesp',[11,-13,-32])
    tor='c18'
    await createCopa(tor,'180714','beling',[4,82])
    await createCopa(tor,'180711','croing',[-5,68,109])
    await createCopa(tor,'180628','ingbel',[-51])
    await createCopa(tor,'180618','tuning',[-11,35,-90])
    //================== IRA =====================//
    tor='ami'
    await createCopa(tor,'220923','irauru',[79])
    await createCopa(tor,'190611','corira',[57,-62])
    tor='eli'
    await createCopa(tor,'220324','corira',[45,63])
    await createCopa(tor,'211012','iracor',[-48,76])
    tor='tor'
    await createCopa(tor,'190128','irajap',[-56,-67,-90])
    tor='c18'
    await createCopa(tor,'180625','irapor',[-45,90])
    await createCopa(tor,'180618','iraesp',[-54])
    await createCopa(tor,'180615','marira',[-90])
    //================== EUA =====================//
    tor='ami'
    await createCopa(tor,'220927','araeua',[])
    await createCopa(tor,'220923','japeua',[24,88])
    await createCopa(tor,'220605','euauru',[])
    await createCopa(tor,'220601','euamar',[26,32,64])
    await createCopa(tor,'210609','euacrc',[8,42,52,77])
    await createCopa(tor,'210530','suieua',[-5,10,63])
    await createCopa(tor,'190202','euacrc',[80,88])
    tor='eli'
    await createCopa(tor,'220330','crceua',[51,59])
    await createCopa(tor,'220324','mexeua',[])
    await createCopa(tor,'220130','caneua',[7,90])
    await createCopa(tor,'211112','euamex',[74,85])
    await createCopa(tor,'211013','euacrc',[-1,25,66])
    await createCopa(tor,'210905','euacan',[55,-62])
    await createCopa(tor,'210801','euamex',[117])
    tor='tor'
    await createCopa(tor,'210718','euacan',[1])
    await createCopa(tor,'210606','euamex',[-1,27,-79,82,114])
    await createCopa(tor,'191115','euacan',[2,23,34,-72,89])
    await createCopa(tor,'191015','caneua',[63,90])
    await createCopa(tor,'190707','mexeua',[73])
    //================== GALES =====================//
    tor='ami'
    await createCopa(tor,'210602','fragal',[34,47,79])
    await createCopa(tor,'210327','galmex',[11])
    tor='eli'
    await createCopa(tor,'211116','galbel',[-12,32])
    await createCopa(tor,'210324','belgal',[-10,22,28,73])
    await createCopa(tor,'191013','galcro',[-9,45])
    await createCopa(tor,'190608','crogal',[17,48,-77])
    tor='tor'
    await createCopa(tor,'220925','galpol',[-57])
    await createCopa(tor,'220922','belgal',[10,37,-50])
    await createCopa(tor,'220611','galbel',[-51,86])
    await createCopa(tor,'220601','polgal',[-52,72,85])
    await createCopa(tor,'210626','galdin',[-27,-48,-88,-90])
    await createCopa(tor,'210612','galsui',[-49,74])
    await createCopa(tor,'181116','galdin',[-42,-88,89])
    await createCopa(tor,'180909','dingal',[32,63])
    //================== ARGENTINA =====================//
    tor='ami'
    await createCopa(tor,'191115','braarg',[-13])
    await createCopa(tor,'191118','arguru',[-34,63,-68,90])
    await createCopa(tor,'191009','alearg',[15,22,-66,-85])
    await createCopa(tor,'190910','argmex',[17,22,33,39])
    await createCopa(tor,'190326','mararg',[-83])
    tor='eli'
    await createCopa(tor,'211116','argbra',[])
    await createCopa(tor,'211112','uruarg',[-7])
    await createCopa(tor,'211010','arguru',[38,44,62])
    tor='tor'
    await createCopa(tor,'210710','argbra',[22])
    await createCopa(tor,'210618','arguru',[13])
    await createCopa(tor,'190702','braarg',[19,71])
    tor='c18'
    await createCopa(tor,'180630','fraarg',[13,-41,-48,57,64,68,-90])
    await createCopa(tor,'180621','argcro',[-53,-80,-90])
    //================== ARABIA SAUDITA =====================//
    tor='eli'
    await createCopa(tor,'220329','araaus',[65])
    await createCopa(tor,'220201','japara',[31,50])
    await createCopa(tor,'211111','ausara',[])
    await createCopa(tor,'211007','arajap',[71])
    tor='tor'
    await createCopa(tor,'211207','marara',[45])
    await createCopa(tor,'190121','japara',[20])
    tor='c18'
    await createCopa(tor,'180620','uruara',[23])
    //================== MEXICO =====================//
    tor='ami'
    await createCopa(tor,'220602','mexuru',[-35,-46,-54])
    await createCopa(tor,'210330','crcmex',[-89])
    tor='eli'
    await createCopa(tor,'220130','mexcrc',[])
    await createCopa(tor,'211116','canmex',[45,52,-90])
    await createCopa(tor,'211007','mexcan',[21,-41])
    await createCopa(tor,'210905','crcmex',[-45])
    tor='tor'
    await createCopa(tor,'210729','mexcan',[45,-57,90])
    await createCopa(tor,'210603','mexcrc',[])
    await createCopa(tor,'190629','mexcrc',[44,-52])
    await createCopa(tor,'190619','mexcan',[40,54,-75,77])
    tor='c18'
    await createCopa(tor,'180702','bramex',[51,88])
    await createCopa(tor,'180623','cormex',[-26,-66,90])
    await createCopa(tor,'180617','alemex',[-35])
    //================== POLONIA =====================//
    tor='tor'
    await createCopa(tor,'220614','polbel',[-16])
    await createCopa(tor,'220608','belpol',[-28,42,59,73,80,83,90])
    await createCopa(tor,'210619','esppol',[25,-54])
    await createCopa(tor,'181120','porpol',[33,-66])
    await createCopa(tor,'181011','polpor',[18,-31,-42,-52,77])
    tor='c18'
    await createCopa(tor,'180628','jappol',[-59])
    //================== DINAMARCA =====================//
    tor='ami'
    await createCopa(tor,'220329','dinser',[15,53,57])
    tor='eli'
    await createCopa(tor,'191012','dinsui',[84])
    await createCopa(tor,'190326','suidin',[19,66,76,-84,-88,-90])
    tor='tor'
    await createCopa(tor,'220925','dinfra',[33,39])
    await createCopa(tor,'220922','crodin',[49,-77,79])
    await createCopa(tor,'220610','dincro',[-69])
    await createCopa(tor,'220603','fradin',[51,-68,-88])
    await createCopa(tor,'210617','dinbel',[2,-54,-70])
    await createCopa(tor,'201118','beldin',[3,-17,57,69,-86,87])
    await createCopa(tor,'200905','dinbel',[-9,-76])
    tor='c18'
    await createCopa(tor,'180701','crodin',[-1,4])
    await createCopa(tor,'180626','dinfra',[])
    await createCopa(tor,'180621','dinaus',[7,-38])
    //================== TUNISIA =====================//
    tor='ami'
    await createCopa(tor,'220927','bratun',[11,-18,19,29,40,74])
    await createCopa(tor,'190611','crotun',[-16,47,-70])
    await createCopa(tor,'191012','tuncam',[])
    tor='tor'
    await createCopa(tor,'220614','japtun',[-55,-76,-90])
    await createCopa(tor,'190708','gantun',[-73,90])
    tor='c18'
    await createCopa(tor,'180623','beltun',[6,16,-18,45,51,90,-90])
    //================== FRANCA =====================//
    tor='ami'
    await createCopa(tor,'181120','frauru',[52])
    tor='tor'
    await createCopa(tor,'220606','crofra',[-52,83])
    await createCopa(tor,'211010','espfra',[64,-66,-80])
    await createCopa(tor,'211007','belfra',[37,40,-62,-69,-90])
    await createCopa(tor,'210628','frasui',[-15,57,59,75,-81,-90])
    await createCopa(tor,'210623','porfra',[31,-45,-47,60])
    await createCopa(tor,'210615','fraale',[20])
    await createCopa(tor,'201114','porfra',[-53])
    await createCopa(tor,'201011','frapor',[])
    await createCopa(tor,'201014','crofra',[-8,64,-79])
    await createCopa(tor,'200908','fracro',[-16,43,45,-55,65,77])
    await createCopa(tor,'181016','fraale',[-14,62,80])
    await createCopa(tor,'180906','alefra',[])
    tor='c18'
    await createCopa(tor,'180715','fracro',[18,-28,38,59,65,-69])
    await createCopa(tor,'180710','frabel',[51])
    await createCopa(tor,'180706','urufra',[-40,-61])
    await createCopa(tor,'180616','fraaus',[58,-62,80])
    //================== AUSTRALIA =====================//
    tor='ami'
    await createCopa(tor,'190607','coraus',[76])
    tor='eli'
    await createCopa(tor,'220324','ausjap',[-89,-90])
    //================== ALEMANHA =====================//
    tor='ami'
    await createCopa(tor,'190320','aleser',[-12,69])
    tor='tor'
    await createCopa(tor,'210619','porale',[15,-35,-39,-51,-60,67])
    await createCopa(tor,'201117','espale',[17,33,38,55,71,89])
    await createCopa(tor,'201013','alesui',[-5,-26,28,55,-56,60])
    await createCopa(tor,'200903','aleesp',[51,-90])
    await createCopa(tor,'200906','suiale',[-14,57])
    tor='c18'
    await createCopa(tor,'180627','corale',[90,90])
    //================== JAPAO =====================//
    tor='ami'
    await createCopa(tor,'220606','japbra',[-77])
    await createCopa(tor,'210611','japser',[48])
    await createCopa(tor,'210325','japcor',[16,27,83])
    tor='tor'
    await createCopa(tor,'220727','japcor',[49,63,72])
    await createCopa(tor,'220610','japgan',[29,-44,45,73,82])
    await createCopa(tor,'191218','corjap',[28])
    await createCopa(tor,'190620','urujap',[-25,32,-59,66])
    tor='c18'
    await createCopa(tor,'180702','beljap',[-48,-52,69,74,90])
    //================== ESPANHA =====================//
    tor='tor'
    await createCopa(tor,'220927','poresp',[-88])
    await createCopa(tor,'220924','espsui',[-21,55,-58])
    await createCopa(tor,'220609','suiesp',[-13])
    await createCopa(tor,'220602','esppor',[25,-82])
    await createCopa(tor,'210702','suiesp',[-8,68])
    await createCopa(tor,'210628','croesp',[20,-38,-57,-77,85,90,-100,-103])
    await createCopa(tor,'201114','suiesp',[26,-89])
    await createCopa(tor,'201010','espsui',[14])
    await createCopa(tor,'181115','croesp',[54,-56,69,-78,90])
    await createCopa(tor,'180911','espcro',[24,33,35,49,57,70])
    tor='c18'
    await createCopa(tor,'180625','espmar',[-14,19,-81,90])
    await createCopa(tor,'180615','poresp',[4,-24,44,-55,-58,88])
    //================== COSTA RICA =====================//
    tor='ami'
    await createCopa(tor,'220923','corcrc',[28,-41,-63,85])
    await createCopa(tor,'190906','crcuru',[-42,48,90])
    tor='eli'
    await createCopa(tor,'220324','crccan',[45])
    await createCopa(tor,'211112','cancrc',[57])
    tor='tor'
    await createCopa(tor,'210725','crccan',[-18,-68])
    tor='c18'
    await createCopa(tor,'180627','suicrc',[31,-56,88,-90])
    await createCopa(tor,'180622','bracrc',[90,90])
    await createCopa(tor,'180617','crcser',[-56])
    //================== MARROCOS =====================//
    tor='ami'
    await createCopa(tor,'210608','margan',[69])
    tor='tor'
    await createCopa(tor,'220110','margan',[83])
    await createCopa(tor,'210203','marcam',[28,40,73,82])
    tor='c18'
    await createCopa(tor,'180620','pormar',[4])
    //================== CROACIA =====================//
    tor='ami'
    await createCopa(tor,'180906','porcro',[-18,32])
    tor='tor'
    await createCopa(tor,'201117','cropor',[29,-52,-60,65,-90])
    await createCopa(tor,'200905','porcro',[41,58,70,-90,90])
    //================== BELGICA =====================//
    tor='tor'
    await createCopa(tor,'210627','belpor',[42])
    await createCopa(tor,'181118','suibel',[-2,-17,26,31,44,62,84])
    await createCopa(tor,'181012','belsui',[58,-76,84])
    tor='c18'
    await createCopa(tor,'180706','brabel',[-13,-31,76])
    //================== CANADA =====================//
    tor='ami'
    await createCopa(tor,'220927','canuru',[-6,-33])
    //================== SUIÇA =====================//
    tor='tor'
    await createCopa(tor,'220612','suipor',[1])
    await createCopa(tor,'220605','porsui',[15,35,39,68])
    tor='c18'
    await createCopa(tor,'180622','sersui',[5,-52,-90])
    await createCopa(tor,'180617','brasui',[20,-50])
    //================== CAMARÕES =====================//
    tor='ami'
    await createCopa(tor,'220927','corcam',[35])
    tor='tor'
    await createCopa(tor,'190629','camgan',[])
    //================== BRASIL  =====================//
    tor='ami'
    await createCopa(tor,'220923','bragan',[9,28,40])
    await createCopa(tor,'220602','corbra',[-7,31,-42,-57,-80,-90])
    await createCopa(tor,'191119','bracor',[9,36,60])
    tor='eli'
    await createCopa(tor,'211014','brauru',[10,18,58,-77,83])
    await createCopa(tor,'201117','urubra',[-34,-45])
    tor='c18'
    await createCopa(tor,'180627','serbra',[-36,-68])
    //================== SERVIA =====================//
    tor='eli'
    await createCopa(tor,'211114','porser',[2,-33,-90])
    await createCopa(tor,'210327','serpor',[-11,-36,46,60])
    tor='tor'
    await createCopa(tor,'190907','serpor',[-42,-58,68,-80,85,-86])
    await createCopa(tor,'190325','porser',[-7,42])
    //================== URUGUAI =====================//
    tor='ami'
    await createCopa(tor,'181012','coruru',[66,-72,79])
    tor='c18'
    await createCopa(tor,'180630','urupor',[7,-55,62])
    //================== COREIA =====================//
    
    //================== PORTUGAL =====================//
    
    //================== GANA (FIM) =====================//
    ordenarCopa(auxiliar)
    }
    