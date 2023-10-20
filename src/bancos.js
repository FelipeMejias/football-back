import { createIta1 } from "./creations/italia.js";
import { createBra1 } from "./creations/brasil.js";
import { createEsp1 } from "./creations/espanha.js";
import { createIng1 } from "./creations/inglaterra.js";
import { quantoTempoFalta } from "./utils.js";
import { createBra2 } from "./creations/bra2.js";
import { createAle1 } from "./creations/alemanha.js";
export const bancoBra1=[]
export const bancoIng1=[]
export const bancoEsp1=[]
export const bancoIta1=[]
export const bancoAle1=[]
export const bancoBra2=[]
let idGeral
let bancoGeral
export function buildContext(camp,consider=false){
    const BRASIL1=27
    const BRASIL2=33
    const INGLATERRA=8
    const ESPANHA=9
    const ITALIA=8
    const ALEMANHA=7
    if(camp=='bra1')return {
        qtdRodadas:BRASIL1,
        partidasTotais:consider?bancoBra1:bancoBra1.filter(part=>!part.futura),
        listaTimes:timesBra1
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
        listaTimes:timesIta1
    }
    if(camp=='ale1')return {
        qtdRodadas:ALEMANHA,
        partidasTotais:consider?bancoAle1:bancoAle1.filter(part=>!part.futura),
        listaTimes:timesAle1
    }
    if(camp=='bra2')return {
        qtdRodadas:BRASIL2,
        partidasTotais:consider?bancoBra2:bancoBra2.filter(part=>!part.futura),
        listaTimes:timesBra2
    }
}
export async function iniciateDatabases(){
   idGeral=0;bancoGeral=bancoBra1;await createBra1()
   idGeral=0;bancoGeral=bancoBra2;await createBra2()
   idGeral=0;bancoGeral=bancoIng1;await createIng1()
   idGeral=0;bancoGeral=bancoEsp1;await createEsp1()
   idGeral=0;bancoGeral=bancoIta1;await createIta1()
   idGeral=0;bancoGeral=bancoAle1;await createAle1()
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
            texto:faltam,
            camp:'bra1'
        
    }})
    const bras2=bancoBra2.filter(part=>part.futura)
    const bra2=bras2.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            texto:faltam,
            camp:'bra2'
        
    }})
    const ingl=bancoIng1.filter(part=>part.futura)
    const ing=ingl.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            texto:faltam,
            camp:'ing1'
        
    }})
    const espa=bancoEsp1.filter(part=>part.futura)
    const esp=espa.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            texto:faltam,
            camp:'esp1'
        
    }})
    const itam=bancoIta1.filter(part=>part.futura)
    const ita=itam.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            texto:faltam,
            camp:'ita1'
        
    }})
    const alem=bancoAle1.filter(part=>part.futura)
    const ale=alem.map(part=>{
        const faltam=quantoTempoFalta(part.data)
        return {...part,
            texto:faltam,
            camp:'ale1'
        
    }})
    const desordenada=[...ing,...esp,...ita,...bra,...bra2,...ale]
    if(desord){
        const desordenadaFinal=desordenada.filter(part=>{
            if(part.texto=='Finalizado')return false
            return true
        })
        return desordenadaFinal
    }
    const resp= desordenada.sort((a,b)=>{
        if(a.data<b.data){
            return -1
        }else{return true}
    })
    const respFinal= resp.sort((a,b)=>{
        if(a.texto!=='Finalizado' && b.texto=='Finalizado'){
            return -1
        }else{return true}
    })
    return respFinal
}

const timesBra1=['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas']
const timesIng1=['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','man','cit','new','not','she','tot','wes','wol']
const timesEsp1=['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil']
const timesIta1=['ata','bol','cag','emp','fio','fro','gen','int','juv','laz','lec','mil','mon','nap','rom','sal','sas','tor','udi','ver']
const timesBra2=['abc','ago','ava','bot','cea','cha','crb','cri','gua','itu','juv','lon','mir','nov','pon','sam','spo','tom','vil','vit']
const timesAle1=['aug','bay','boc','bor','col','dar','ein','fre','hei','hof','lei','lev','mai','mon','stu','uni','wer','wol']
