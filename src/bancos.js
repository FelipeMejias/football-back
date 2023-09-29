import { buscarMongo } from "./config/db.js";
import { createIta1 } from "./creations/italia.js";
import { createBra1 } from "./creations/brasil.js";
import { createEsp1 } from "./creations/espanha.js";
import { createIng1 } from "./creations/inglaterra.js";
import { quantoTempoFalta } from "./utils.js";

export const bancoBra1=[]
export const bancoIng1=[]
export const bancoEsp1=[]
export const bancoIta1=[]
const qtdBra=24
const qtdIng=6
const qtdEsp=7
const qtdIta=6
let idGeral
let bancoGeral

export async function iniciateDatabases(){
   idGeral=0;bancoGeral=bancoBra1;await createBra1()
   idGeral=0;bancoGeral=bancoIng1;await createIng1()
   idGeral=0;bancoGeral=bancoEsp1;await createEsp1()
   idGeral=0;bancoGeral=bancoIta1;await createIta1()
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
    const itam=bancoIta1.filter(part=>part.futura)
    const ita=itam.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'ita1'
        
    }})
    const resp= [...ing,...esp,...ita,...bra].sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    const respFinal=resp.sort((a,b)=>{
        if(a.on&&!b.on){
            return -1
        }else{return true}
    })
    return respFinal
}
export function buildContext(camp,consider=false){
    if(camp=='bra1')return {
        qtdRodadas:qtdBra,
        partidasTotais:consider?bancoBra1:bancoBra1.filter(part=>!part.futura),
        listaTimes:timesBra1
    }
    if(camp=='ing1')return {
        qtdRodadas:qtdIng,
        partidasTotais:consider?bancoIng1:bancoIng1.filter(part=>!part.futura),
        listaTimes:timesIng1
    }
    if(camp=='esp1')return {
        qtdRodadas:qtdEsp,
        partidasTotais:consider?bancoEsp1:bancoEsp1.filter(part=>!part.futura),
        listaTimes:timesEsp1
    }
    if(camp=='ita1')return {
        qtdRodadas:qtdIta,
        partidasTotais:consider?bancoIta1:bancoIta1.filter(part=>!part.futura),
        listaTimes:timesita1
    }
}
const timesBra1=['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas']
const timesIng1=['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','mau','mac','new','not','she','tot','wes','wol']
const timesEsp1=['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil']
const timesita1=['ata','bol','cag','emp','fio','fro','gen','int','juv','laz','lec','mil','mon','nap','rom','sal','sas','tor','udi','ver']

