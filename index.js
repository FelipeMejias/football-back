import cors from 'cors'
import Express, {json} from 'express'
import { router } from './rotas.js'
import dotenv from 'dotenv'
dotenv.config()
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))

export const bancoBra1=[]
export let bancoWc=[]
export const bancoIng1=[]

/*
r=//================== RODADA  =====================//
await create(r,'',[])
await create(r,'',[])
await create(r,'',[])
await create(r,'',[])
await create(r,'',[])


//==================  =====================//
tor='ami'
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
tor='eli'
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
tor='tor'
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
tor='c18'
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])
await createCopa(tor,'','',[])


*/
let idGeral
let bancoGeral
async function iniciateDatabases(){
   idGeral=0
   bancoGeral=bancoBra1
   await createBra1()
   idGeral=0
   bancoGeral=bancoWc
   await createWc()
}
iniciateDatabases()


async function create(rodada,times,goals){
   if(!times)return;
   idGeral++
   const id=idGeral
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
   bancoGeral.push({id,rodada,mandante,visitante,gols})
}
async function createCopa(torneio,data,times,goals){
   if(!times)return;
   idGeral++
   const id=idGeral
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
   bancoGeral.push({id,data,torneio,mandante,visitante,gols})
}
async function createBra1(){
   let r
   r=38//================== RODADA 38 =====================//
   await create(r,'flaava',[42,-45,-79])
   await create(r,'capbot',[52,62,90])
   await create(r,'ceajuv',[23,45,-52,70,89])
   await create(r,'amgago',[-17,45])
   await create(r,'sanfor',[-66,-80])
   await create(r,'cuictb',[37,44,-76])
   await create(r,'braflu',[-31])
   await create(r,'corcam',[-45])
   await create(r,'intpal',[10,39,85])
   await create(r,'goisao',[-20,-71,-77,-90])
   r=37//================== RODADA 37 =====================//
   await create(r,'saoint',[-21])
   await create(r,'ctbcor',[10,-30,37,-48])
   await create(r,'flugoi',[78,83,90])
   await create(r,'avacea',[49,90])
   await create(r,'forbra',[26,37,42,45,57,90])
   await create(r,'juvfla',[-1,36,43,-90])
   await create(r,'palamg',[-15,42,81])
   await create(r,'agocap',[51,-61])
   await create(r,'botsan',[10,53,70])
   await create(r,'camcui',[4,45,56])
   r=36//================== RODADA 36 =====================//
   await create(r,'sanava',[5,-51])
   await create(r,'flusao',[-30,46,56,59])
   await create(r,'braamg',[-6,18,-25,-42,-90])
   await create(r,'goijuv',[81])
   await create(r,'corcea',[90])
   await create(r,'intcap',[63,67])
   await create(r,'forago',[-17,58])
   await create(r,'ctbfla',[58])
   await create(r,'cuipal',[6,-75])
   await create(r,'cambot',[-76,-84])
   r=35//================== RODADA 35 =====================//
    await create(r,'ceaflu',[-72])
    await create(r,'botcui',[-41,-52])
    await create(r,'saocam',[-25,40,45,-81])
    await create(r,'capgoi',[6,13,29,-40,-51])
    await create(r,'amgint',[76])
    await create(r,'juvctb',[-90])
    await create(r,'avabra',[-60,-68,90])
    await create(r,'agosan',[-19,29,39,-52,-90])
    await create(r,'palfor',[15,48,32,64])
    await create(r,'flacor',[-43,48,-75])
    r=34//================== RODADA 34 =====================//
    await create(r,'flasan',[45,-53,78,87,-90])
    await create(r,'cappal',[30,-59,-70,-76])
    await create(r,'botbra',[18,-62,71])
    await create(r,'corflu',[-12,-70])
    await create(r,'intcea',[-6,65,78])
    await create(r,'goiamg',[-60,61,-88,90])
    await create(r,'forctb',[2,55,-60,73])
    await create(r,'saoago',[22,-72,90])
    await create(r,'camjuv',[12])
    await create(r,'cuiava',[90])
    r=33//================== RODADA 33 =====================//
    await create(r,'bracap',[5,37,45,-64,-67,90])
    await create(r,'amgfla',[-11,13,-24])
    await create(r,'sancor',[-89])
    await create(r,'palava',[4,55,90])
    await create(r,'flubot',[-41,-52,76,82])
    await create(r,'juvsao',[-36,39,-56])
    await create(r,'ctbint',[24,-60])
    await create(r,'agocea',[24])
    await create(r,'cuigoi',[-8,-20,65])
    await create(r,'forcam',[])
    r=32//================== RODADA 32 =====================//
    await create(r,'flacam',[38])
    await create(r,'amgfor',[-34,-83,90])
    await create(r,'ceacui',[-82,90])
    await create(r,'palsao',[])
    await create(r,'juvago',[-51,76])
    await create(r,'botint',[-67])
    await create(r,'avaflu',[-25,-41,-63])
    await create(r,'capctb',[89])
    await create(r,'brasan',[-51,-69])
    await create(r,'goicor',[])
    r=31//================== RODADA 31 =====================//
    await create(r,'cuifla',[-58,-66,90])
    await create(r,'corcap',[6,22,-81])
    await create(r,'intgoi',[13,-33,42,-45,57,90])
    await create(r,'saobot',[-90])
    await create(r,'forava',[54,90])
    await create(r,'ctbbra',[12,-26,58])
    await create(r,'camcea',[])
    await create(r,'fluamg',[-5,-34])
    await create(r,'agopal',[-49,65])
    await create(r,'sanjuv',[24,54,63,75,-78])
    r=30//================== RODADA 30 =====================//
    await create(r,'juvcor',[-24,46,-54,62])
    await create(r,'agoflu',[-5,-37,45,75,88])
    await create(r,'ceagoi',[47,-90])
    await create(r,'bracui',[-34,45,60])
    await create(r,'capfor',[-15,90])
    await create(r,'flaint',[])
    await create(r,'sancam',[-72,88,-90])
    await create(r,'palctb',[15,34,51,77])
    await create(r,'amgsao',[10,-34,-90])
    await create(r,'avabot',[11,-49,-56])
    r=29//================== RODADA 29 =====================//
    await create(r,'camflu',[41,65])
    await create(r,'intsan',[23])
    await create(r,'ceaamg',[-25,-68,90])
    await create(r,'avaago',[-45,-56,66])
    await create(r,'capjuv',[20,69])
    await create(r,'flabra',[12,-48,66,70,71])
    await create(r,'goifor',[-14])
    await create(r,'corcui',[33,45])
    await create(r,'botpal',[20,-26,-36,-60])
    await create(r,'saoctb',[2,63,72,-84])
    r=28//================== RODADA 28 =====================//
    await create(r,'saoava',[25,45,45,90])
    await create(r,'sancap',[35,90])
    await create(r,'ctbcea',[30])
    await create(r,'corago',[12,-17,88])
    await create(r,'flujuv',[19,28,56,88])
    await create(r,'forfla',[18,-32,-45,51,90])
    await create(r,'cuiamg',[32,62,-90])
    await create(r,'intbra',[])
    await create(r,'campal',[-51])
    await create(r,'goibot',[-89])
    r=27//================== RODADA 27 =====================//
    await create(r,'avacam',[54])
    await create(r,'botctb',[75,79])
    await create(r,'bragoi',[28,-55])
    await create(r,'flaflu',[-45,-76,83])
    await create(r,'ceasao',[-23,-90])
    await create(r,'amgcor',[77])
    await create(r,'juvfor',[-44,78])
    await create(r,'palsan',[77])
    await create(r,'capcui',[-8,35,45,-64])
    await create(r,'agoint',[-28,-35,64])
    r=26//================== RODADA 26 =====================//
    await create(r,'cambra',[17,-31])
    await create(r,'intcui',[68])
    await create(r,'ceasan',[6,30,-56])
    await create(r,'flufor',[11,-51,56])
    await create(r,'paljuv',[46,-63,67])
    await create(r,'avacap',[22,-48])
    await create(r,'botamg',[])
    await create(r,'saocor',[-14,33])
    await create(r,'ctbago',[45,49])
    await create(r,'goifla',[80,-84])
    r=25//================== RODADA 25 =====================//
    await create(r,'juvava',[-59,70])
    await create(r,'brapal',[25,35,-45,-71])
    await create(r,'capflu',[26])
    await create(r,'amgctb',[30,78])
    await create(r,'flacea',[-45,53])
    await create(r,'corint',[-1,13,19,-67])
    await create(r,'forbot',[-19,-36,-64,70])
    await create(r,'agocam',[-45,-58])
    await create(r,'cuisao',[7,-80])
    await create(r,'sangoi',[-2,55,-61])
    r=24//================== RODADA 24 =====================//
    await create(r,'goiago',[11,54,-84])
    await create(r,'ctbava',[78])
    await create(r,'flupal',[-8,38])
    await create(r,'ceacap',[])
    await create(r,'saofor',[-32])
    await create(r,'amgcam',[-10,19])
    await create(r,'botfla',[-58])
    await create(r,'cuisan',[])
    await create(r,'intjuv',[38,45,48,90])
    await create(r,'corbra',[31])
    r=23//================== RODADA 23 =====================//
    await create(r,'camgoi',[-51])
    await create(r,'fluctb',[3,36,-72,77,-84,90,90])
    await create(r,'juvbot',[9,-61,65,-72])
    await create(r,'palfla',[-29,66])
    await create(r,'capamg',[25,-64])
    await create(r,'agocui',[34,-81])
    await create(r,'forcor',[65])
    await create(r,'bracea',[-80,90])
    await create(r,'sansao',[33])
    await create(r,'avaint',[-90])
    r=22//================== RODADA 22 =====================//
    await create(r,'goiava',[-45,79])
    await create(r,'corpal',[-72])
    await create(r,'cuijuv',[22])
    await create(r,'botago',[])
    await create(r,'ctbcam',[-90])
    await create(r,'ceafor',[-17])
    await create(r,'flacap',[56,59,63,71,90])
    await create(r,'saobra',[25,59,61])
    await create(r,'amgsan',[14])
    await create(r,'intflu',[36,71,90]) 
    r=21//================== RODADA 21 =====================//
    await create(r,'juvamg',[-8])
    await create(r,'botcea',[9,-49])
    await create(r,'avacor',[36,-77])
    await create(r,'agobra',[52,60,-86])
    await create(r,'saofla',[-7,-90])
    await create(r,'flucui',[2])
    await create(r,'palgoi',[19,45,83])
    await create(r,'forint',[45,70,84])
    await create(r,'camcap',[30,-46,54,-56,-90])
    await create(r,'ctbsan',[-47,57,-90])
    r=20//================== RODADA 20 =====================//
    await create(r,'goictb',[80])
    await create(r,'ceapal',[-31,-45,80])
    await create(r,'corbot',[27])
    await create(r,'flaago',[22,23,32,45,-82])
    await create(r,'capsao',[69])
    await create(r,'intcam',[7,24,31])
    await create(r,'cuifor',[-25])
    await create(r,'amgava',[-4,34,70,90])
    await create(r,'brajuv',[28])
    await create(r,'sanflu',[16,-71,-72,86])
   r=19//================== RODADA 19 =====================//
    await create(r,'saogoi',[-8,29,33,-39,48,-90])
    await create(r,'botcap',[19,54])
    await create(r,'avafla',[47,-55,-84])
    await create(r,'palint',[18,-82,88])
    await create(r,'juvcea',[66])
    await create(r,'flubra',[62,66,-72])
    await create(r,'camcor',[9,-80,-86])
    await create(r,'agoamg',[-33])
    await create(r,'forsan',[])
    await create(r,'ctbcui',[40])
    r=18//================== RODADA 18 =====================//
    await create(r,'ceaava',[45])
    await create(r,'brafor',[37,-57,90])
    await create(r,'goiflu',[-28,44,80,-84,-85])
    await create(r,'capago',[9,14,49,-72,90])
    await create(r,'flajuv',[6,13,18,86])
    await create(r,'intsao',[4,-10,24,-30,41,-54])
    await create(r,'sanbot',[33,77])
    await create(r,'corctb',[36,-54,67,85])
    await create(r,'cuicam',[-90,90])
    await create(r,'amgpal',[-65])
    r=17//================== RODADA 17 =====================//
    await create(r,'capint',[])
    await create(r,'flactb',[13,22])
    await create(r,'avasan',[10])
    await create(r,'ceacor',[-4,28,33,76])
    await create(r,'juvgoi',[])
    await create(r,'saoflu',[-25,34,42,-64])
    await create(r,'botcam',[-55])
    await create(r,'agofor',[-74])
    await create(r,'amgbra',[-2,-7,-41])
    await create(r,'palcui',[49])
    r=16//================== RODADA 16 =====================//
    await create(r,'braava',[70,76,87,90])
    await create(r,'flucea',[39,54,-90])
    await create(r,'goicap',[6,40,-62])
    await create(r,'ctbjuv',[-5,-34,53,78])
    await create(r,'corfla',[52])
    await create(r,'sanago',[76])
    await create(r,'forpal',[])
    await create(r,'camsao',[])
    await create(r,'cuibot',[22,90])
    await create(r,'intamg',[90])
    r=15//================== RODADA 15 =====================//
    await create(r,'juvcam',[-30,-56,76])
    await create(r,'flucor',[15,42,71,90])
    await create(r,'sanfla',[-18,66,-73])
    await create(r,'ceaint',[20,-24])
    await create(r,'palcap',[-36,-58])
    await create(r,'avacui',[30,-49,-64])
    await create(r,'agosao',[-24,30,-62])
    await create(r,'amggoi',[59])
    await create(r,'ctbfor',[2,-85,90])
    await create(r,'brabot',[-64])
    r=14//================== RODADA 14 =====================//
    await create(r,'intctb',[19,42,54])
    await create(r,'capbra',[5,16,23,67,-79,-82])
    await create(r,'flaamg',[41,71,90])
    await create(r,'corsan',[])
    await create(r,'camfor',[-3,-29,76,87,90])
    await create(r,'avapal',[45,-47,-65,73])
    await create(r,'botflu',[-82])
    await create(r,'goicui',[80])
    await create(r,'ceaago',[-26,48])
    await create(r,'saojuv',[])
    r=13//================== RODADA 13 =====================//
    await create(r,'cuicea',[])
    await create(r,'sanbra',[17,36,-45,-71])
    await create(r,'camfla',[35,85])
    await create(r,'ctbcap',[-90])
    await create(r,'corgoi',[34])
    await create(r,'intbot',[9,14,-19,-59,-90])
    await create(r,'foramg',[43])
    await create(r,'agojuv',[-23,59,63,86])
    await create(r,'fluava',[5,72])
    await create(r,'saopal',[17,-90,-90])
    r=12//================== RODADA 12 =====================//
    await create(r,'juvsan',[26,-57,-77])
    await create(r,'ceacam',[])
    await create(r,'bractb',[7,34,36,-51,75,-92])
    await create(r,'goiint',[-8,41,-47])
    await create(r,'flacui',[6,79])
    await create(r,'capcor',[-5,82])
    await create(r,'amgflu',[])
    await create(r,'botsao',[61])
    await create(r,'palago',[-28,42,44,45,45,-79])
    await create(r,'avafor',[33,40,-44,-65,70])
    r=11//================== RODADA 11 =====================//
    await create(r,'corjuv',[2,84])
    await create(r,'camsan',[6,-84])
    await create(r,'fluago',[-35,-45])
    await create(r,'cuibra',[-17,45])
    await create(r,'intfla',[1,22,-58,90])
    await create(r,'goicea',[-9,85])
    await create(r,'saoamg',[34])
    await create(r,'ctbpal',[-23,-63])
    await create(r,'forcap',[])
    await create(r,'botava',[-45])
    r=10//================== RODADA 10 =====================//
    await create(r,'cuicor',[36])
    await create(r,'amgcea',[-22,-55])
    await create(r,'juvcap',[38,-45,-63,-90])
    await create(r,'agoava',[34,-43,90])
    await create(r,'brafla',[17])
    await create(r,'flucam',[18,29,-35,37,-45,-53,58,63])
    await create(r,'sanint',[63,-71])
    await create(r,'palbot',[11,18,33,87])
    await create(r,'ctbsao',[-4,59])
    await create(r,'forgoi',[13,-56])
    r=9//================== RODADA 9 =====================//
    await create(r,'amgcui',[25,-42,53])
    await create(r,'capsan',[-12,43,56,-64])
    await create(r,'ceactb',[37,-85])
    await create(r,'avasao',[-45,67])
    await create(r,'agocor',[-33])
    await create(r,'juvflu',[32])
    await create(r,'flafor',[-28,45,-90])
    await create(r,'palcam',[])
    await create(r,'braint',[-90,-90])
    await create(r,'botgoi',[45,-73,-84],'')
    r=8//================== RODADA 8 =====================//
    await create(r,'goibra',[-40,74])
    await create(r,'saocea',[8,-37,42,-71])
    await create(r,'forjuv',[-49,65])
    await create(r,'ctbbot',[29])
    await create(r,'sanpal',[-80])
    await create(r,'cuicap',[-85])
    await create(r,'coramg',[-67,82])
    await create(r,'flufla',[10,-34,-57])
    await create(r,'camava',[-41,53,66])
    await create(r,'intago',[12,-79])
    r=7//================== RODADA 7 =====================//
    await create(r,'agoctb',[45,90])
    await create(r,'flagoi',[17])
    await create(r,'sancea',[])
    await create(r,'juvpal',[-9,-31,-90])
    await create(r,'cuiint',[50,-83])
    await create(r,'amgbot',[38,-86])
    await create(r,'corsao',[-45,80])
    await create(r,'forflu',[-9])
    await create(r,'capava',[25,44,-51])
    await create(r,'bracam',[13,-66])
    r=6//================== RODADA 6 =====================//
    await create(r,'palbra',[30,90])
    await create(r,'ceafla',[-7,26,-38,90])
    await create(r,'intcor',[25,-30,44,-64])
    await create(r,'camago',[14,72])
    await create(r,'flucap',[8,78,-90])
    await create(r,'saocui',[-33,66,82])
    await create(r,'ctbamg',[45])
    await create(r,'avajuv',[-25,27,-70])
    await create(r,'botfor',[-14,42,89,90])
    await create(r,'goisan',[19])
    r=5//================== RODADA 5 =====================//
    await create(r,'camamg',[-7,69,-81])
    await create(r,'capcea',[49])
    await create(r,'flabot',[-51])
    await create(r,'palflu',[72,-83])
    await create(r,'agogoi',[-1])
    await create(r,'bracor',[-54])
    await create(r,'sancui',[3,-11,37,76,78])
    await create(r,'juvint',[-47,90])
    await create(r,'forsao',[-57,69])
    await create(r,'avactb',[-52,62,73])
    r=4//================== RODADA 4 =====================//
    await create(r,'ceabra',[-17])
    await create(r,'amgcap',[75])
    await create(r,'goicam',[-39,53,-56,80])
    await create(r,'cuiago',[-45,82])
    await create(r,'botjuv',[-64,83])
    await create(r,'corfor',[53])
    await create(r,'ctbflu',[-19,-36,53,61,90])
    await create(r,'intava',[])
    await create(r,'saosan',[10,-45,82])
    await create(r,'flapal',[])
    r=3//================== RODADA 3 =====================//
    await create(r,'brasao',[1,-70])
    await create(r,'capfla',[32])
    await create(r,'palcor',[14,19,71])
    await create(r,'fluint',[-54])
    await create(r,'camctb',[23,36,-62,-78])
    await create(r,'sanamg',[29,51,78])
    await create(r,'juvcui',[-84])
    await create(r,'agobot',[51,-90])
    await create(r,'avagoi',[4,51,62,-76,-88])
    await create(r,'forcea',[-45])
    r=2//================== RODADA 2 =====================//
    await create(r,'goipal',[57,-90])
    await create(r,'amgjuv',[19,25,65,-84,89])
    await create(r,'corava',[9,25,55])
    await create(r,'cuiflu',[-90])
    await create(r,'sanctb',[12,-28,32])
    await create(r,'flasao',[25,-41,69,72])
    await create(r,'capcam',[-49])
    await create(r,'intfor',[-45,45,90])
    await create(r,'braago',[19,26,30,59])
    await create(r,'ceabot',[-18,43,-60,-80])
    r=1//================== RODADA 1 =====================//
    await create(r,'flusan',[])
    await create(r,'agofla',[75,-84])
    await create(r,'palcea',[-7,-14,22,-85,90])
    await create(r,'ctbgoi',[10,47,90])
    await create(r,'botcor',[-17,-26,-44,66])
    await create(r,'camint',[10,90])
    await create(r,'forcui',[-8])
    await create(r,'avaamg',[52])
    await create(r,'saocap',[19,52,70,74])
    await create(r,'juvbra',[-12,30,69,-89])
}
async function createWc(){
let tor
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

ordenarCopa()

}
function ordenarCopa(){
   const resp=[]
   let maior;const used=[];let inuse
   for(let k=0;k<bancoWc.length;k++){
      maior={data:-Infinity}
      inuse=null
      for(let t=0;t<bancoWc.length;t++){
         if(bancoWc[t].data>maior.data&&!used.includes(t)){
            inuse=t
            maior=bancoWc[t]
         }
      }
      resp.push(maior)
      used.push(inuse)
   }
   bancoWc=resp
   
}


/*
const cup=['cat','equ','sen','hol','ing','ira','eua','gal','arg','ara','mex','pol','din','tun','fra','aus','ale','jap','esp','crc','mar','cro','bel','can','sui','cam','bra','ser','uru','cor','por','gan']
function maisPartidas(){
   bancoWc.forEach(part=>{
      const {mandante,visitante}=part
      if(contagem[mandante]){
         contagem[mandante]=contagem[mandante]+1
      }else{contagem[mandante]=1}

      if(contagem[visitante]){
         contagem[visitante]=contagem[visitante]+1
      }else{contagem[mandante]=1}
    })
    cup.forEach(time=>{
      console.log(time,contagem[time])
    })
}

function partidasCruzadas(list){
   const lista=bancoFake.filter(part=>(
         list.includes(part.mandante)&&list.includes(part.visitante)
         ))
   lista.forEach(p=>{
      const {rodada,mandante,visitante,gols}=p
      let man=0;let vis=0
      gols.forEach(g=>{
         if(g.mandante){man++}else{vis++}
      })
      console.log(`(${rodada}) ${mandante} ${man} x ${vis} ${visitante} `)
   })
}
bancoFake.forEach(part=>{
      const {gols,mandante,visitante,rodada}=part
      const t=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
      let man=0;let vis=0
      for(let gol of gols){
         if(gol.mandante){
            man++
         }else{vis++}
      }
      console.log(`${mandante} ${man} x ${vis} ${visitante}`)
      if(id%10==0)console.log(`---------------rodada ${rodada+1}`)
    })
    */