import { createIta1 } from "./creations/italia.js";
import { createBra1 } from "./creations/brasil.js";
import { createEsp1 } from "./creations/espanha.js";
import { createIng1 } from "./creations/inglaterra.js";
import { quantoTempoFalta } from "./utils.js";
import { createBra2 } from "./creations/bra2.js";
export const bancoBra1=[]
export const bancoBra2=[]
export const bancoIng1=[]
export const bancoEsp1=[]
export const bancoIta1=[]
let idGeral
let bancoGeral
export function buildContext(camp,consider=false){
    const BRASIL1=26
    const BRASIL2=31
    const INGLATERRA=8
    const ESPANHA=9
    const ITALIA=8
    if(camp=='bra1')return {
        qtdRodadas:BRASIL1,
        partidasTotais:consider?bancoBra1:bancoBra1.filter(part=>!part.futura),
        listaTimes:timesBra1
    }
    if(camp=='bra2')return {
        qtdRodadas:BRASIL2,
        partidasTotais:consider?bancoBra2:bancoBra2.filter(part=>!part.futura),
        listaTimes:timesBra2
    }
    if(camp=='ing1')return {
        qtdRodadas:INGLATERRA,
        partidasTotais:consider?bancoIng1:bancoIng1.filter(part=>!part.futura),
        listaTimes:timesIng1
    }
    if(camp=='esp1')return {
        qtdRodadas:ESPANHA,
        partidasTotais:consider?bancoEsp1:bancoEsp1.filter(part=>!part.futura),
        listaTimes:timesEsp1
    }
    if(camp=='ita1')return {
        qtdRodadas:ITALIA,
        partidasTotais:consider?bancoIta1:bancoIta1.filter(part=>!part.futura),
        listaTimes:timesita1
    }
}
export async function iniciateDatabases(){
   idGeral=0;bancoGeral=bancoBra1;await createBra1()
   idGeral=0;bancoGeral=bancoBra2;await createBra2()
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
export function buildFuturaResponse(desord=false){
    const bras=bancoBra1.filter(part=>part.futura)
    const bra=bras.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'bra1'
        
    }})
    const bras2=bancoBra2.filter(part=>part.futura)
    const bra2=bras2.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            ...faltam,
            camp:'bra2'
        
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
    const desordenada=[...ing,...esp,...ita,...bra,...bra2].sort((a,b)=>{
        if(a.on&&!b.on){
            return -1
        }else{return true}
    })
    if(desord){
        return desordenada
    }
    const resp= desordenada.sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    return resp
}

const timesBra1=['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas']
const timesIng1=['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','mau','mac','new','not','she','tot','wes','wol']
const timesEsp1=['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil']
const timesita1=['ata','bol','cag','emp','fio','fro','gen','int','juv','laz','lec','mil','mon','nap','rom','sal','sas','tor','udi','ver']
const timesBra2=['abc','ago','ava','bot','cea','cha','crb','cri','gua','itu','juv','lon','mir','nov','pon','sam','spo','tom','vil','vit']
