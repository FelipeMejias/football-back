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
   /*
   const goo={}
   const vii={}
   const fuu={}
   const paa={}
    bancoEsp1.forEach(part=>{
       const {mandante,visitante,gols,rodada}=part
       if(paa[mandante]){
        paa[mandante]=paa[mandante]+1
    }else{
        paa[mandante]=1
    }
    if(paa[visitante]){
        paa[visitante]=paa[visitante]+1
    }else{
        paa[visitante]=1
    }
        if(fuu[mandante]){
            fuu[mandante]=fuu[mandante]+1
        }else{
            fuu[mandante]=1
        }
        if(fuu[visitante]){
            fuu[visitante]=fuu[visitante]+1
        }else{
            fuu[visitante]=1
        }
       let ma=0;let vi=0
       for(let gol of gols){
        if(!gol.mandante){
            ma++
            if(goo[mandante]){
                goo[mandante]=goo[mandante]+1
            }else{
                goo[mandante]=1
            }
        }else{
            vi++
            if(goo[visitante]){
                goo[visitante]=goo[visitante]+1
            }else{
                goo[visitante]=1
            }
        }
       }
       if(vi>ma){
        if(vii[visitante]){
            vii[visitante]=vii[visitante]+1
        }else{
            vii[visitante]=1
        }
       }
       if(ma>vi){
        if(vii[mandante]){
            vii[mandante]=vii[mandante]+1
        }else{
            vii[mandante]=1
        }
       }
       if(mandante=='atm'||visitante=='atm'){
        console.log(`${rodada} = ${mandante} ${ma} x ${vi} ${visitante}`)
       }
     })
     
     
     for(let time of ['alm','atb','atm','bar','bet','cad','cel','elc','esp','get','gir','mal','osa','ray','rem','res','rev','sev','val','vil']){
        console.log(time+'= '+' G: '+paa[time])
     }
     
     */
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
        listaTimes:['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
    }
    if(camp=='ing1')return {
        qtdRodadas:16,
        partidasTotais:bancoIng1,
        listaTimes:['ars','ast','bou','bre','bri','che','cry','eve','ful','lee','lei','liv','mau','mac','new','not','sou','tot','wes','wol']
    }
    if(camp=='esp1')return {
        qtdRodadas:14,
        partidasTotais:bancoEsp1,
        listaTimes:['alm','atb','atm','bar','bet','cad','cel','elc','esp','get','gir','mal','osa','ray','rem','res','rev','sev','val','vil']
    }
    if(camp=='ale1')return {
        qtdRodadas:14,
        partidasTotais:bancoAle1,
        listaTimes:['aug','bay','boc','bor','col','ein','fre','her','hof','lei','lev','mai','mon','sch','stu','uni','wer','wol']
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
        listaTimes:['cat','equ','sen','hol','ing','ira','eua','gal','arg','ara','mex','pol','din','tun','fra','aus','ale','jap','esp','crc','mar','cro','bel','can','sui','cam','bra','ser','uru','cor','por','gan']
    }
}