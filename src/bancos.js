import { buscarMongo } from "./config/db.js";
import { createAle1 } from "./creations/alemanha.js";
import { createAra1 } from "./creations/ara1.js";
import { createBra1 } from "./creations/brasil.js";
import { createEsp1 } from "./creations/espanha.js";
import { createIng1 } from "./creations/inglaterra.js";
import { quantoTempoFalta } from "./utils.js";

export const bancoBra1=[]
export const bancoIng1=[]
export const bancoEsp1=[]
export const bancoAle1=[]
export const bancoAra1=[]
let idGeral
let bancoGeral

export async function iniciateDatabases(){
   //buscarMongo()
   //idGeral=0;bancoGeral=bancoBra1antigo;await createBra1antigo()
   idGeral=0;bancoGeral=bancoBra1;await createBra1()
   idGeral=0;bancoGeral=bancoIng1;await createIng1()
   idGeral=0;bancoGeral=bancoEsp1;await createEsp1()
   //idGeral=0;bancoGeral=bancoAle1;await createAle1()
   //idGeral=0;bancoGeral=bancoAra1;await createAra1()
   //conferir(bancoAle1,timesAle1)
}

export async function create(rodada,times,escant,goals=[]){
   if(!times)return;
   idGeral++
   const id=idGeral
   const mandante=times[0]+times[1]+times[2]
   const visitante=times[3]+times[4]+times[5]
   if(typeof escant  == "string")return bancoGeral.push({
        id,rodada,mandante,visitante,
        data:escant,futura:true
    })
   const gols=[]
   let man=0
   let vis=0
   for(let goal of goals){
      if(goal>=0){
            man++
          gols.push({mandante:true,minuto:goal})
      }else{
        vis++
         gols.push({mandante:false,minuto:-goal})
      }
   }
   const part={id,rodada,mandante,visitante,escant,gols,placar:[man,vis]}
   bancoGeral.push(part)
}
export function buildFuturaResponse(){
    const arab=bancoAra1.filter(part=>part.futura)
    const ara=arab.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'ara1'
        
    }})
    const bras=bancoBra1.filter(part=>part.futura)
    const bra=bras.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'bra1'
        
    }})
    const ingl=bancoIng1.filter(part=>part.futura)
    const ing=ingl.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'ing1'
        
    }})
    const espa=bancoEsp1.filter(part=>part.futura)
    const esp=espa.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'esp1'
        
    }})
    const alem=bancoAle1.filter(part=>part.futura)
    const ale=alem.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'ale1'
        
    }})
    const resp= [...ing,...esp,...ale,...bra,...ara].sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    return resp
}
export function buildContext(camp,consider=false){
    if(camp=='bra1')return {
        qtdRodadas:24,
        partidasTotais:consider?bancoBra1:bancoBra1.filter(part=>!part.futura),
        listaTimes:timesBra1
    }
    if(camp=='ara1')return {
        qtdRodadas:2,
        partidasTotais:consider?bancoAra1:bancoAra1.filter(part=>!part.futura),
        listaTimes:timesAra1
    }
    if(camp=='ing1')return {
        qtdRodadas:6,
        partidasTotais:consider?bancoIng1:bancoIng1.filter(part=>!part.futura),
        listaTimes:timesIng1
    }
    if(camp=='esp1')return {
        qtdRodadas:6,
        partidasTotais:consider?bancoEsp1:bancoEsp1.filter(part=>!part.futura),
        listaTimes:timesEsp1
    }
    if(camp=='ale1')return {
        qtdRodadas:15,
        partidasTotais:consider?bancoAle1:bancoAle1.filter(part=>!part.futura),
        listaTimes:timesAle1
    }
}
const timesBra1=['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas']
const timesIng1=['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','mau','mac','new','not','she','tot','wes','wol']
const timesEsp1=['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil']
const timesAle1=['aug','bay','boc','bor','col','ein','fre','her','hof','lei','lev','mai','mon','sch','stu','uni','wer','wol']
const timesAra1=['abh','ahl','akh','dha','ett','fat','fei','haz','hil','itt','kha','nas','rae','riy','sha','taa','tae','weh']
function conferir(banco,times){
    const ch={}
    for(let part of banco){
     const {mandante,visitante,gols}=part
     for(let gol of gols){
         if(gol.mandante){
             if(ch[visitante]){
                 ch[visitante]=ch[visitante]+1
             }else{
                 ch[visitante]=1
             }
         }else{
             if(ch[mandante]){
                 ch[mandante]=ch[mandante]+1
             }else{
                 ch[mandante]=1
             }
         }
     }
    }
    for(let time of times){
     console.log(`${time} - ${ch[time]}`)
    }
}
