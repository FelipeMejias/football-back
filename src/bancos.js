import { createIta1 } from "./adicionadas/p4_ITA.js";
import { createEsp1 } from "./adicionadas/p3_ESP.js";
import { createIng1 } from "./adicionadas/p2_ING.js";
import { createAle1 } from "./adicionadas/p5_ALE.js";
import { createFra1 } from "./adicionadas/p6_FRA.js";

export function buildContext(camp,inteiro=false){
    //if(camp=='bra1')return {partidasTotais:inteiro===true?createBra1:inteiro?extrairPosteriores(createBra1,inteiro):extrairFuturas(createBra1),listaTimes:timesBra1}
    if(camp=='ing1')return {partidasTotais:inteiro===true?createIng1:inteiro?extrairPosteriores(createIng1,inteiro):extrairFuturas(createIng1),listaTimes:timesIng1}
    if(camp=='esp1')return {partidasTotais:inteiro===true?createEsp1:inteiro?extrairPosteriores(createEsp1,inteiro):extrairFuturas(createEsp1),listaTimes:timesEsp1}
    if(camp=='ita1')return {partidasTotais:inteiro===true?createIta1:inteiro?extrairPosteriores(createIta1,inteiro):extrairFuturas(createIta1),listaTimes:timesIta1}
    if(camp=='ale1')return {partidasTotais:inteiro===true?createAle1:inteiro?extrairPosteriores(createAle1,inteiro):extrairFuturas(createAle1),listaTimes:timesAle1}
    if(camp=='fra1')return {partidasTotais:inteiro===true?createFra1:inteiro?extrairPosteriores(createFra1,inteiro):extrairFuturas(createFra1),listaTimes:timesFra1}
    //if(camp=='bra2')return {partidasTotais:inteiro===true?createBra2:inteiro?extrairPosteriores(createBra2,inteiro):extrairFuturas(createBra2),listaTimes:timesBra2}
}
function extrairFuturas(array){
    const resp=[...array]
    for(let k=0;k<array.length;k++){
        if(array[k][1].length!=2){
            resp.shift()
        }else{
            return resp
        }
    }
    return resp
}
function extrairPosteriores(array,manvis){
    const resp=[]
    let podeIr=false
    for(let k=0;k<array.length;k++){
        if(array[k][0]==manvis)podeIr=true
        if(podeIr && array[k][1].length==2){
            resp.push(array[k])
        }
    }
    return resp
}
//const timesBra1=['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas']
const timesIng1=['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','man','cit','new','not','she','tot','wes','wol']
const timesEsp1=['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil']
const timesIta1=['ata','bol','cag','emp','fio','fro','gen','int','juv','laz','lec','mil','mon','nap','rom','sal','sas','tor','udi','ver']
//const timesBra2=['abc','ago','ava','bot','cea','cha','crb','cri','gua','itu','juv','lon','mir','nov','pon','sam','spo','tom','vil','vit']
const timesAle1=['aug','bay','boc','bor','col','dar','ein','fre','hei','hof','lei','lev','mai','mon','stu','uni','wer','wol']
const timesFra1=['bre','cle','hav','len','lor','los','lyo','met','mon','mpl','nan','nic','oly','psg','rei','ren','str','tou']