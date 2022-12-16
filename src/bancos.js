import { buscarMongo } from "./config/db.js";
import { createAle1 } from "./creations/alemanha.js";
import { createBra1 } from "./creations/brasil.js";
import { createEsp1 } from "./creations/espanha.js";
import { createIng1 } from "./creations/inglaterra.js";

export const bancoBra1=[]
export const bancoIng1=[]
export const bancoEsp1=[]
export const bancoAle1=[]

let idGeral
let bancoGeral

export async function iniciateDatabases(){
   //buscarMongo()
   idGeral=0;bancoGeral=bancoBra1;await createBra1()
   idGeral=0;bancoGeral=bancoIng1;await createIng1()
   idGeral=0;bancoGeral=bancoEsp1;await createEsp1()
   idGeral=0;bancoGeral=bancoAle1;await createAle1()
   //conferir(bancoAle1,timesAle1)
}

export async function create(rodada,times,goals){
   if(!times)return;
   idGeral++
   const id=idGeral
   const mandante=times[0]+times[1]+times[2]
   const visitante=times[3]+times[4]+times[5]
   if(typeof goals  == "string")return bancoGeral.push({
        id,rodada,mandante,visitante,
        data:goals,futura:true
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
   const part={id,rodada,mandante,visitante,gols,placar:[man,vis]}
   bancoGeral.push(part)
}
export function buildFuturaResponse(){
    const ingl=bancoIng1.filter(part=>part.futura)
    const ing=ingl.map(part=>({...part,camp:'ing1'}))
    const espa=bancoEsp1.filter(part=>part.futura)
    const esp=espa.map(part=>({...part,camp:'esp1'}))
    const alem=bancoAle1.filter(part=>part.futura)
    const ale=alem.map(part=>({...part,camp:'ale1'}))
    const resp= [...ing,...esp,...ale].sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    return resp
}
export function buildContext(camp,consider=false){
    if(camp=='bra1')return {
        qtdRodadas:38,
        partidasTotais:consider?bancoBra1:bancoBra1.filter(part=>!part.futura),
        listaTimes:timesBra1
    }
    if(camp=='ing1')return {
        qtdRodadas:16,
        partidasTotais:consider?bancoIng1:bancoIng1.filter(part=>!part.futura),
        listaTimes:timesIng1
    }
    if(camp=='esp1')return {
        qtdRodadas:14,
        partidasTotais:consider?bancoEsp1:bancoEsp1.filter(part=>!part.futura),
        listaTimes:timesEsp1
    }
    if(camp=='ale1')return {
        qtdRodadas:15,
        partidasTotais:consider?bancoAle1:bancoAle1.filter(part=>!part.futura),
        listaTimes:timesAle1
    }
}

const timesBra1=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
const timesIng1=['ars','ast','bou','bre','bri','che','cry','eve','ful','lee','lei','liv','mau','mac','new','not','sou','tot','wes','wol']
const timesEsp1=['alm','atb','atm','bar','bet','cad','cel','elc','esp','get','gir','mal','osa','ray','rem','res','rev','sev','val','vil']
const timesAle1=['aug','bay','boc','bor','col','ein','fre','her','hof','lei','lev','mai','mon','sch','stu','uni','wer','wol']

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
