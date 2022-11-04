import {MongoClient} from 'mongodb'
import cors from 'cors'
import Express, {json} from 'express'
import { router } from './rotas.js'
import dotenv from 'dotenv'
dotenv.config()
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
export const bancoFake=[]

createAll()

const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))
/*
 r=//================== RODADA 1 =====================//
    id++ //1
    await create(id,r,'',[])
    id++ //2
    await create(id,r,'',[])
    id++ //3
    await create(id,r,'',[])
    id++ //4
    await create(id,r,'',[])
    id++ //5
    await create(id,r,'',[])
    id++ //6
    await create(id,r,'',[])
    id++ //7
    await create(id,r,'',[])
    id++ //8
    await create(id,r,'',[])
    id++ //9
    await create(id,r,'',[])
    id++ //10
    await create(id,r,'',[])
*/
async function create(id,rodada,times,goals){
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
   try {
      bancoFake.push({id,rodada,mandante,visitante,gols})
      if(id%10==0)console.log(`rodada ${rodada} (${id} partidas)`)
   } catch (error) {
      console.log('ERRO AO CRIAR')
   }
}


async function createAll(){
   let id=0;let r
   r=1//================== RODADA 1 =====================//
    id++ //1
    await create(id,r,'flusan',[])
    id++ //2
    await create(id,r,'agofla',[75,-84])
    id++ //3
    await create(id,r,'palcea',[-7,-14,22,-85,90])
    id++ //4
    await create(id,r,'ctbgoi',[10,47,90])
    id++ //5
    await create(id,r,'botcor',[-17,-26,-44,66])
    id++ //6
    await create(id,r,'camint',[10,90])
    id++ //7
    await create(id,r,'forcui',[-8])
    id++ //8
    await create(id,r,'avaamg',[52])
    id++ //9
    await create(id,r,'saocap',[19,52,70,74])
    id++ //10
    await create(id,r,'juvbra',[-12,30,69,-89])
    r=2//================== RODADA 2 =====================//
    id++ //1
    await create(id,r,'goipal',[57,-90])
    id++ //2
    await create(id,r,'amgjuv',[19,25,65,-84,89])
    id++ //3
    await create(id,r,'corava',[9,25,55])
    id++ //4
    await create(id,r,'cuiflu',[-90])
    id++ //5
    await create(id,r,'sanctb',[12,-28,32])
    id++ //6
    await create(id,r,'flasao',[25,-41,69,72])
    id++ //7
    await create(id,r,'capcam',[-49])
    id++ //8
    await create(id,r,'intfor',[-45,45,90])
    id++ //9
    await create(id,r,'braago',[19,26,30,59])
    id++ //10
    await create(id,r,'ceabot',[-18,43,-60,-80])
    r=3//================== RODADA 3 =====================//
    id++ //1
    await create(id,r,'brasao',[1,-70])
    id++ //2
    await create(id,r,'capfla',[32])
    id++ //3
    await create(id,r,'palcor',[14,19,71])
    id++ //4
    await create(id,r,'fluint',[-54])
    id++ //5
    await create(id,r,'camctb',[23,36,-62,-78])
    id++ //6
    await create(id,r,'sanamg',[29,51,78])
    id++ //7
    await create(id,r,'juvcui',[-84])
    id++ //8
    await create(id,r,'agobot',[51,-90])
    id++ //9
    await create(id,r,'avagoi',[4,51,62,-76,-88])
    id++ //10
    await create(id,r,'forcea',[-45])
    r=4//================== RODADA 4 =====================//
    id++ //1
    await create(id,r,'ceabra',[-17])
    id++ //2
    await create(id,r,'amgcap',[75])
    id++ //3
    await create(id,r,'goicam',[-39,53,-56,80])
    id++ //4
    await create(id,r,'cuiago',[-45,82])
    id++ //5
    await create(id,r,'botjuv',[-64,83])
    id++ //6
    await create(id,r,'corfor',[53])
    id++ //7
    await create(id,r,'ctbflu',[-19,-36,53,61,90])
    id++ //8
    await create(id,r,'intava',[])
    id++ //9
    await create(id,r,'saosan',[10,-45,82])
    id++ //10
    await create(id,r,'flapal',[])
    r=5//================== RODADA 5 =====================//
    id++ //1
    await create(id,r,'camamg',[-7,69,-81])
    id++ //2
    await create(id,r,'capcea',[49])
    id++ //3
    await create(id,r,'flabot',[-51])
    id++ //4
    await create(id,r,'palflu',[72,-83])
    id++ //5
    await create(id,r,'agogoi',[-1])
    id++ //6
    await create(id,r,'bracor',[-54])
    id++ //7
    await create(id,r,'sancui',[3,-11,37,76,78])
    id++ //8
    await create(id,r,'juvint',[-47,90])
    id++ //9
    await create(id,r,'forsao',[-57,69])
    id++ //10
    await create(id,r,'avactb',[-52,62,73])
    r=6//================== RODADA 6 =====================//
    id++ //1
    await create(id,r,'palbra',[30,90])
    id++ //2
    await create(id,r,'ceafla',[-7,26,-38,90])
    id++ //3
    await create(id,r,'intcor',[25,-30,44,-64])
    id++ //4
    await create(id,r,'camago',[14,72])
    id++ //5
    await create(id,r,'flucap',[8,78,-90])
    id++ //6
    await create(id,r,'saocui',[-33,66,82])
    id++ //7
    await create(id,r,'ctbamg',[45])
    id++ //8
    await create(id,r,'avajuv',[-25,27,-70])
    id++ //9
    await create(id,r,'botfor',[-14,42,89,90])
    id++ //10
    await create(id,r,'goisan',[19])
 r=7
    id++ //1
    await create(id,r,'agoctb',[45,90])
    id++ //2
    await create(id,r,'flagoi',[17])
    id++ //3
    await create(id,r,'sancea',[])
    id++ //4
    await create(id,r,'juvpal',[-9,-31,-90])
    id++ //5
    await create(id,r,'cuiint',[50,-83])
    id++ //6
    await create(id,r,'amgbot',[38,-86])
    id++ //7
    await create(id,r,'corsao',[-45,80])
    id++ //8
    await create(id,r,'forflu',[-9])
    id++ //9
    await create(id,r,'capava',[25,44,-51])
    id++ //10
    await create(id,r,'bracam',[13,-66])
 r=8
    id++ //1
    await create(id,r,'goibra',[-40,74])
    id++ //2
    await create(id,r,'saocea',[8,-37,42,-71])
    id++ //3
    await create(id,r,'forjuv',[-49,65])
    id++ //4
    await create(id,r,'ctbbot',[29])
    id++ //5
    await create(id,r,'sanpal',[-80])
    id++ //6
    await create(id,r,'cuicap',[-85])
    id++ //7
    await create(id,r,'coramg',[-67,82])
    id++ //8
    await create(id,r,'flufla',[10,-34,-57])
    id++ //9
    await create(id,r,'camava',[-41,53,66])
    id++ //10
    await create(id,r,'intago',[12,-79])

  r=9
    id++ //1
    await create(id,r,'amgcui',[25,-42,53])
    id++ //2
    await create(id,r,'capsan',[-12,43,56,-64])
    id++ //3
    await create(id,r,'ceactb',[37,-85])
    id++ //4
    await create(id,r,'avasao',[-45,67])
    id++ //5
    await create(id,r,'agocor',[-33])
    id++ //6
    await create(id,r,'juvflu',[32])
    id++ //7
    await create(id,r,'flafor',[-28,45,-90])
    id++ //8
    await create(id,r,'palcam',[])
    id++ //9
    await create(id,r,'braint',[-90,-90])
    id++ //10
    await create(id,r,'botgoi',[45,-73,-84],'')

 r=10
    id++ //1
    await create(id,r,'cuicor',[36])
    id++ //2
    await create(id,r,'amgcea',[-22,-55])
    id++ //3
    await create(id,r,'juvcap',[38,-45,-63,-90])
    id++ //4
    await create(id,r,'agoava',[34,-43,90])
    id++ //5
    await create(id,r,'brafla',[17])
    id++ //6
    await create(id,r,'flucam',[18,29,-35,37,-45,-53,58,63])
    id++ //7
    await create(id,r,'sanint',[63,-71])
    id++ //8
    await create(id,r,'palbot',[11,18,33,87])
    id++ //9
    await create(id,r,'ctbsao',[-4,59])
    id++ //10
    await create(id,r,'forgoi',[13,-56])
 r=11
    id++ //1
    await create(id,r,'corjuv',[2,84])
    id++ //2
    await create(id,r,'camsan',[6,-84])
    id++ //3
    await create(id,r,'fluago',[-35,-45])
    id++ //4
    await create(id,r,'cuibra',[-17,45])
    id++ //5
    await create(id,r,'intfla',[1,22,-58,90])
    id++ //6
    await create(id,r,'goicea',[-9,85])
    id++ //7
    await create(id,r,'saoamg',[34])
    id++ //8
    await create(id,r,'ctbpal',[-23,-63])
    id++ //9
    await create(id,r,'forcap',[])
    id++ //10
    await create(id,r,'botava',[-45])

 r=12
    id++ //1
    await create(id,r,'juvsan',[26,-57,-77])
    id++ //2
    await create(id,r,'ceacam',[])
    id++ //3
    await create(id,r,'bractb',[7,34,36,-51,75,-92])
    id++ //4
    await create(id,r,'goiint',[-8,41,-47])
    id++ //5
    await create(id,r,'flacui',[6,79])
    id++ //6
    await create(id,r,'capcor',[-5,82])
    id++ //7
    await create(id,r,'amgflu',[])
    id++ //8
    await create(id,r,'botsao',[61])
    id++ //9
    await create(id,r,'palago',[-28,42,44,45,45,-79])
    id++ //10
    await create(id,r,'avafor',[33,40,-44,-65,70])

  r=13
    id++ //1
    await create(id,r,'cuicea',[])
    id++ //2
    await create(id,r,'sanbra',[17,36,-45,-71])
    id++ //3
    await create(id,r,'camfla',[35,85])
    id++ //4
    await create(id,r,'ctbcap',[-90])
    id++ //5
    await create(id,r,'corgoi',[34])
    id++ //6
    await create(id,r,'intbot',[9,14,-19,-59,-90])
    id++ //7
    await create(id,r,'foramg',[43])
    id++ //8
    await create(id,r,'agojuv',[-23,59,63,86])
    id++ //9
    await create(id,r,'fluava',[5,72])
    id++ //10
    await create(id,r,'saopal',[17,-90,-90])

 r=14
    id++ //1
    await create(id,r,'intctb',[19,42,54])
    id++ //2
    await create(id,r,'capbra',[5,16,23,67,-79,-82])
    id++ //3
    await create(id,r,'flaamg',[41,71,90])
    id++ //4
    await create(id,r,'corsan',[])
    id++ //5
    await create(id,r,'camfor',[-3,-29,76,87,90])
    id++ //6
    await create(id,r,'avapal',[45,-47,-65,73])
    id++ //7
    await create(id,r,'botflu',[-82])
    id++ //8
    await create(id,r,'goicui',[80])
    id++ //9
    await create(id,r,'ceaago',[-26,48])
    id++ //10
    await create(id,r,'saojuv',[])

 r=15
    id++ //1
    await create(id,r,'juvcam',[-30,-56,76])
    id++ //2
    await create(id,r,'flucor',[15,42,71,90])
    id++ //3
    await create(id,r,'sanfla',[-18,66,-73])
    id++ //4
    await create(id,r,'ceaint',[20,-24])
    id++ //5
    await create(id,r,'palcap',[-36,-58])
    id++ //6
    await create(id,r,'avacui',[30,-49,-64])
    id++ //7
    await create(id,r,'agosao',[-24,30,-62])
    id++ //8
    await create(id,r,'amggoi',[59])
    id++ //9
    await create(id,r,'ctbfor',[2,-85,90])
    id++ //10
    await create(id,r,'brabot',[-64])

 r=16
    id++ //1
    await create(id,r,'braava',[70,76,87,90])
    id++ //2
    await create(id,r,'flucea',[39,54,-90])
    id++ //3
    await create(id,r,'goicap',[6,40,-62])
    id++ //4
    await create(id,r,'ctbjuv',[-5,-34,53,78])
    id++ //5
    await create(id,r,'corfla',[52])
    id++ //6
    await create(id,r,'sanago',[76])
    id++ //7
    await create(id,r,'forpal',[])
    id++ //8
    await create(id,r,'camsao',[])
    id++ //9
    await create(id,r,'cuibot',[22,90])
    id++ //10
    await create(id,r,'intamg',[90])

 r=17
    id++ //1
    await create(id,r,'capint',[])
    id++ //2
    await create(id,r,'flactb',[13,22])
    id++ //3
    await create(id,r,'avasan',[10])
    id++ //4
    await create(id,r,'ceacor',[-4,28,33,76])
    id++ //5
    await create(id,r,'juvgoi',[])
    id++ //6
    await create(id,r,'saoflu',[-25,34,42,-64])
    id++ //7
    await create(id,r,'botcam',[-55])
    id++ //8
    await create(id,r,'agofor',[-74])
    id++ //9
    await create(id,r,'amgbra',[-2,-7,-41])
    id++ //10
    await create(id,r,'palcui',[49])

  r=18
    id++ //1
    await create(id,r,'ceaava',[45])
    id++ //2
    await create(id,r,'brafor',[37,-57,90])
    id++ //3
    await create(id,r,'goiflu',[-28,44,80,-84,-85])
    id++ //4
    await create(id,r,'capago',[9,14,49,-72,90])
    id++ //5
    await create(id,r,'flajuv',[6,13,18,86])
    id++ //6
    await create(id,r,'intsao',[4,-10,24,-30,41,-54])
    id++ //7
    await create(id,r,'sanbot',[33,77])
    id++ //8
    await create(id,r,'corctb',[36,-54,67,85])
    id++ //9
    await create(id,r,'cuicam',[-90,90])
    id++ //10
    await create(id,r,'amgpal',[-65])
   
  r=19
    id++ //1
    await create(id,r,'saogoi',[-8,29,33,-39,48,-90])
    id++ //2
    await create(id,r,'botcap',[19,54])
    id++ //3
    await create(id,r,'avafla',[47,-55,-84])
    id++ //4
    await create(id,r,'palint',[18,-82,88])
    id++ //5
    await create(id,r,'juvcea',[66])
    id++ //6
    await create(id,r,'flubra',[62,66,-72])
    id++ //7
    await create(id,r,'camcor',[9,-80,-86])
    id++ //8
    await create(id,r,'agoamg',[-33])
    id++ //9
    await create(id,r,'forsan',[])
    id++ //10
    await create(id,r,'ctbcui',[40])
   
 r=20
    id++ //1
    await create(id,r,'goictb',[80])
    id++ //2
    await create(id,r,'ceapal',[-31,-45,80])
    id++ //3
    await create(id,r,'corbot',[27])
    id++ //4
    await create(id,r,'flaago',[22,23,32,45,-82])
    id++ //5
    await create(id,r,'capsao',[69])
    id++ //6
    await create(id,r,'intcam',[7,24,31])
    id++ //7
    await create(id,r,'cuifor',[-25])
    id++ //8
    await create(id,r,'amgava',[-4,34,70,90])
    id++ //9
    await create(id,r,'brajuv',[28])
    id++ //10
    await create(id,r,'sanflu',[16,-71,-72,86])
    
 r=21
    id++ //1
    await create(id,r,'juvamg',[-8])
    id++ //2
    await create(id,r,'botcea',[9,-49])
    id++ //3
    await create(id,r,'avacor',[36,-77])
    id++ //4
    await create(id,r,'agobra',[52,60,-86])
    id++ //5
    await create(id,r,'saofla',[-7,-90])
    id++ //6
    await create(id,r,'flucui',[2])
    id++ //7
    await create(id,r,'palgoi',[19,45,83])
    id++ //8
    await create(id,r,'forint',[45,70,84])
    id++ //9
    await create(id,r,'camcap',[30,-46,54,-56,-90])
    id++ //10
    await create(id,r,'ctbsan',[-47,57,-90])

 r=22
    id++ //1
    await create(id,r,'goiava',[-45,79])
    id++ //2
    await create(id,r,'corpal',[-72])
    id++ //3
    await create(id,r,'cuijuv',[22])
    id++ //4
    await create(id,r,'botago',[])
    id++ //5
    await create(id,r,'ctbcam',[-90])
    id++ //6
    await create(id,r,'ceafor',[-17])
    id++ //7
    await create(id,r,'flacap',[56,59,63,71,90])
    id++ //8
    await create(id,r,'saobra',[25,59,61])
    id++ //9
    await create(id,r,'amgsan',[14])
    id++ //10
    await create(id,r,'intflu',[36,71,90]) 

 r=23
    id++ //1
    await create(id,r,'camgoi',[-51])
    id++ //2
    await create(id,r,'fluctb',[3,36,-72,77,-84,90,90])
    id++ //3
    await create(id,r,'juvbot',[9,-61,65,-72])
    id++ //4
    await create(id,r,'palfla',[-29,66])
    id++ //5
    await create(id,r,'capamg',[25,-64])
    id++ //6
    await create(id,r,'agocui',[34,-81])
    id++ //7
    await create(id,r,'forcor',[65])
    id++ //8
    await create(id,r,'bracea',[-80,90])
    id++ //9
    await create(id,r,'sansao',[33])
    id++ //10
    await create(id,r,'avaint',[-90])

 r=24
    id++ //1
    await create(id,r,'goiago',[11,54,-84])
    id++ //2
    await create(id,r,'ctbava',[78])
    id++ //3
    await create(id,r,'flupal',[-8,38])
    id++ //4
    await create(id,r,'ceacap',[])
    id++ //5
    await create(id,r,'saofor',[-32])
    id++ //6
    await create(id,r,'amgcam',[-10,19])
    id++ //7
    await create(id,r,'botfla',[-58])
    id++ //8
    await create(id,r,'cuisan',[])
    id++ //9
    await create(id,r,'intjuv',[38,45,48,90])
    id++ //10
    await create(id,r,'corbra',[31])

 r=25
    id++ //1
    await create(id,r,'juvava',[-59,70])
    id++ //2
    await create(id,r,'brapal',[25,35,-45,-71])
    id++ //3
    await create(id,r,'capflu',[26])
    id++ //4
    await create(id,r,'amgctb',[30,78])
    id++ //5
    await create(id,r,'flacea',[-45,53])
    id++ //6
    await create(id,r,'corint',[-1,13,19,-67])
    id++ //7
    await create(id,r,'forbot',[-19,-36,-64,70])
    id++ //8
    await create(id,r,'agocam',[-45,-58])
    id++ //9
    await create(id,r,'cuisao',[7,-80])
    id++ //10
    await create(id,r,'sangoi',[-2,55,-61])
    r=26//================== RODADA 26 =====================//
    id++ //1
    await create(id,r,'cambra',[17,-31])
    id++ //2
    await create(id,r,'intcui',[68])
    id++ //3
    await create(id,r,'ceasan',[6,30,-56])
    id++ //4
    await create(id,r,'flufor',[11,-51,56])
    id++ //5
    await create(id,r,'paljuv',[46,-63,67])
    id++ //6
    await create(id,r,'avacap',[22,-48])
    id++ //7
    await create(id,r,'botamg',[])
    id++ //8
    await create(id,r,'saocor',[-14,33])
    id++ //9
    await create(id,r,'ctbago',[45,49])
    id++ //10
    await create(id,r,'goifla',[80,-84])
    r=27//================== RODADA 27 =====================//
    id++ //1
    await create(id,r,'avacam',[54])
    id++ //2
    await create(id,r,'botctb',[75,79])
    id++ //3
    await create(id,r,'bragoi',[28,-55])
    id++ //4
    await create(id,r,'flaflu',[-45,-76,83])
    id++ //5
    await create(id,r,'ceasao',[-23,-90])
    id++ //6
    await create(id,r,'amgcor',[77])
    id++ //7
    await create(id,r,'juvfor',[-44,78])
    id++ //8
    await create(id,r,'palsan',[77])
    id++ //9
    await create(id,r,'capcui',[-8,35,45,-64])
    id++ //10
    await create(id,r,'agoint',[-28,-35,64])
    r=28//================== RODADA 28 =====================//
    id++ //1
    await create(id,r,'saoava',[25,45,45,90])
    id++ //2
    await create(id,r,'sancap',[35,90])
    id++ //3
    await create(id,r,'ctbcea',[30])
    id++ //4
    await create(id,r,'corago',[12,-17,88])
    id++ //5
    await create(id,r,'flujuv',[19,28,56,88])
    id++ //6
    await create(id,r,'forfla',[18,-32,-45,51,90])
    id++ //7
    await create(id,r,'cuiamg',[32,62,-90])
    id++ //8
    await create(id,r,'intbra',[])
    id++ //9
    await create(id,r,'campal',[-51])
    id++ //10
    await create(id,r,'goibot',[-89])
    r=29//================== RODADA 29 =====================//
    id++ //1
    await create(id,r,'camflu',[41,65])
    id++ //2
    await create(id,r,'intsan',[23])
    id++ //3
    await create(id,r,'ceaamg',[-25,-68,90])
    id++ //4
    await create(id,r,'avaago',[-45,-56,66])
    id++ //5
    await create(id,r,'capjuv',[20,69])
    id++ //6
    await create(id,r,'flabra',[12,-48,66,70,71])
    id++ //7
    await create(id,r,'goifor',[-14])
    id++ //8
    await create(id,r,'corcui',[33,45])
    id++ //9
    await create(id,r,'botpal',[20,-26,-36,-60])
    id++ //10
    await create(id,r,'saoctb',[2,63,72,-84])
    r=30//================== RODADA 30 =====================//
    id++ //1
    await create(id,r,'juvcor',[-24,46,-54,62])
    id++ //2
    await create(id,r,'agoflu',[-5,-37,45,75,88])
    id++ //3
    await create(id,r,'ceagoi',[47,-90])
    id++ //4
    await create(id,r,'bracui',[-34,45,60])
    id++ //5
    await create(id,r,'capfor',[-15,90])
    id++ //6
    await create(id,r,'flaint',[])
    id++ //7
    await create(id,r,'sancam',[-72,88,-90])
    id++ //8
    await create(id,r,'palctb',[15,34,51,77])
    id++ //9
    await create(id,r,'amgsao',[10,-34,-90])
    id++ //10
    await create(id,r,'avabot',[11,-49,-56])
   
    r=31//================== RODADA 31 =====================//
    id++ //1
    await create(id,r,'cuifla',[-58,-66,90])
    id++ //2
    await create(id,r,'corcap',[6,22,-81])
    id++ //3
    await create(id,r,'intgoi',[13,-33,42,-45,57,90])
    id++ //4
    await create(id,r,'saobot',[-90])
    id++ //5
    await create(id,r,'forava',[54,90])
    id++ //6
    await create(id,r,'ctbbra',[12,-26,58])
    id++ //7
    await create(id,r,'camcea',[])
    id++ //8
    await create(id,r,'fluamg',[-5,-34])
    id++ //9
    await create(id,r,'agopal',[-49,65])
    id++ //10
    await create(id,r,'sanjuv',[24,54,63,75,-78])
    r=32//================== RODADA 32 =====================//
    id++ //1
    await create(id,r,'flacam',[38])
    id++ //2
    await create(id,r,'amgfor',[-34,-83,90])
    id++ //3
    await create(id,r,'ceacui',[-82,90])
    id++ //4
    await create(id,r,'palsao',[])
    id++ //5
    await create(id,r,'juvago',[-51,76])
    id++ //6
    await create(id,r,'botint',[-67])
    id++ //7
    await create(id,r,'avaflu',[-25,-41,-63])
    id++ //8
    await create(id,r,'capctb',[89])
    id++ //9
    await create(id,r,'brasan',[-51,-69])
    id++ //10
    await create(id,r,'goicor',[])
    r=33//================== RODADA 33 =====================//
    id++ //1
    await create(id,r,'bracap',[5,37,45,-64,-67,90])
    id++ //2
    await create(id,r,'amgfla',[-11,13,-24])
    id++ //3
    await create(id,r,'sancor',[-89])
    id++ //4
    await create(id,r,'palava',[4,55,90])
    id++ //5
    await create(id,r,'flubot',[-41,-52,76,82])
    id++ //6
    await create(id,r,'juvsao',[-36,39,-56])
    id++ //7
    await create(id,r,'ctbint',[24,-60])
    id++ //8
    await create(id,r,'agocea',[24])
    id++ //9
    await create(id,r,'cuigoi',[-8,-20,65])
    id++ //10
    await create(id,r,'forcam',[])
    r=34//================== RODADA 34 =====================//
    id++ //1
    await create(id,r,'flasan',[45,-53,78,87,-90])
    id++ //2
    await create(id,r,'cappal',[30,-59,-70,-76])
    id++ //3
    await create(id,r,'botbra',[18,-62,71])
    id++ //4
    await create(id,r,'corflu',[-12,-70])
    id++ //5
    await create(id,r,'intcea',[-6,65,78])
    id++ //6
    await create(id,r,'goiamg',[-60,61,-88,90])
    id++ //7
    await create(id,r,'forctb',[2,55,-60,73])
    id++ //8
    await create(id,r,'saoago',[22,-72,90])
    id++ //9
    await create(id,r,'camjuv',[12])
    id++ //10
    await create(id,r,'cuiava',[90])
    r=35//================== RODADA 35 =====================//
    id++ //1
    await create(id,r,'ceaflu',[-72])
    id++ //2
    await create(id,r,'botcui',[-41,-52])
    id++ //3
    await create(id,r,'saocam',[-25,40,45,-81])
    id++ //4
    await create(id,r,'capgoi',[6,13,29,-40,-51])
    id++ //5
    await create(id,r,'amgint',[76])
    id++ //6
    await create(id,r,'juvctb',[-90])
    id++ //7
    await create(id,r,'avabra',[-60,-68,90])
    id++ //8
    await create(id,r,'agosan',[-19,29,39,-52,-90])
    id++ //9
    await create(id,r,'palfor',[15,48,32,64])
    id++ //10
    await create(id,r,'flacor',[-43,48,-75])
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
/*
bancoFake.forEach(part=>{
      const {gols,mandante,visitante,id,rodada}=part
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