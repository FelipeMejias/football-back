import { createBra1 } from "./src-creations/brasil.js";
import { createWc } from "./src-creations/copa.js";
import { createIng1 } from "./src-creations/inglaterra.js";

export const bancoBra1=[]
export const bancoWc=[]
export const bancoIng1=[]

let idGeral
let bancoGeral
export async function iniciateDatabases(){
   createWc()
   idGeral=0;bancoGeral=bancoBra1;await createBra1()
   idGeral=0;bancoGeral=bancoIng1;await createIng1()
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
        qtdRodadas:17,
        partidasTotais:bancoIng1,
        listaTimes:['ars','ast','bou','bre','bri','che','cry','eve','ful','lee','lei','liv','mau','mac','new','not','sou','tot','wes','wol']
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