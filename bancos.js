import { createAle1 } from "./src-creations/alemanha.js";
import { createBra1 } from "./src-creations/brasil.js";
import { createWc } from "./src-creations/copa.js";
import { createEsp1 } from "./src-creations/espanha.js";
import { createIng1 } from "./src-creations/inglaterra.js";

export const bancoBra1=[]
export const bancoWc=[]
export const bancoIng1=[]
export const bancoEsp1=[]
export const bancoAle1=[]

let idGeral
let bancoGeral

export async function iniciateDatabases(){
   createWc()
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

export function buildContext(camp,copaType){
    if(camp=='bra1')return {
        qtdRodadas:36,
        partidasTotais:bancoBra1,
        listaTimes:timesBra1
    }
    if(camp=='ing1')return {
        qtdRodadas:16,
        partidasTotais:bancoIng1,
        listaTimes:timesIng1
    }
    if(camp=='esp1')return {
        qtdRodadas:14,
        partidasTotais:bancoEsp1,
        listaTimes:timesEsp1
    }
    if(camp=='ale1')return {
        qtdRodadas:14,
        partidasTotais:bancoAle1,
        listaTimes:timesAle1
    }
    if(camp=='wc')return {
        qtdRodadas:24,
        partidasTotais:bancoWc.filter(part=>{
            const {torneio}=part
            return(
                (copaType[0]||torneio!='c22')&&
                (copaType[1]||torneio!='eli')&&
                (copaType[2]||torneio!='tor')&&
                (copaType[3]||torneio!='ami')&&
                (copaType[4]||torneio!='c18')
            )}),
        listaTimes:timesWc
    }
}

const timesBra1=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
const timesIng1=['ars','ast','bou','bre','bri','che','cry','eve','ful','lee','lei','liv','mau','mac','new','not','sou','tot','wes','wol']
const timesEsp1=['alm','atb','atm','bar','bet','cad','cel','elc','esp','get','gir','mal','osa','ray','rem','res','rev','sev','val','vil']
const timesAle1=['aug','bay','boc','bor','col','ein','fre','her','hof','lei','lev','mai','mon','sch','stu','uni','wer','wol']
const timesWc=['cat','equ','sen','hol','ing','ira','eua','gal','arg','ara','mex','pol','din','tun','fra','aus','ale','jap','esp','crc','mar','cro','bel','can','sui','cam','bra','ser','uru','cor','por','gan']

function conferir(banco,times){
    const gc={}
    for(let part of bancoAle1){
     const {mandante,visitante,gols}=part
     for(let gol of gols){
         if(gol.mandante){
             if(gc[visitante]){
                 gc[visitante]=gc[visitante]+1
             }else{
                 gc[visitante]=1
             }
         }else{
             if(gc[mandante]){
                 gc[mandante]=gc[mandante]+1
             }else{
                 gc[mandante]=1
             }
         }
     }
    }
    for(let time of timesAle1){
     console.log(`${time} - ${gc[time]}`)
    }
}