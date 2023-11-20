import { createIta1 } from "./creations/part_ita1.js";
import { createBra1 } from "./creations/part_bra1.js";
import { createEsp1 } from "./creations/part_esp1.js";
import { createIng1 } from "./creations/part_ing1.js";
import { createBra2 } from "./creations/part_bra2.js";
import { createAle1 } from "./creations/part_ale1.js";

export function buildContext(camp,inteiro=false){
    if(camp=='bra1')return inteiro===true?createBra1:{
        partidasTotais:buscarTotais(createBra1,inteiro),
        listaTimes:timesBra1
    }
    if(camp=='ing1')return inteiro===true?createIng1:{
        partidasTotais:buscarTotais(createIng1,inteiro),
        listaTimes:timesIng1
    }
    if(camp=='esp1')return inteiro===true?createEsp1:{
        partidasTotais:buscarTotais(createEsp1,inteiro),
        listaTimes:timesEsp1
    }
    if(camp=='ita1')return inteiro===true?createIta1:{
        partidasTotais:buscarTotais(createIta1,inteiro),
        listaTimes:timesIta1
    }
    if(camp=='ale1')return inteiro===true?createAle1:{
        partidasTotais:buscarTotais(createAle1,inteiro),
        listaTimes:timesAle1
    }
    if(camp=='bra2')return inteiro===true?createBra2:{
        partidasTotais:buscarTotais(createBra2,inteiro),
        listaTimes:timesBra2
    }
}
function buscarTotais(banco,rodadaEstipulada){
    //let diminui=1
    let diminui=0
    const partidas=[]
    const totais=banco.length
    for(let k=0;k<totais;k++){
        const rodada=totais-k
        banco[k].forEach(el=>{
            if(el[1].length==2){
                if(rodadaEstipulada==null){
                    if(k!=0)partidas.push(el)
                }else if(rodadaEstipulada<0){
                    if(k!=0&&k!=1)partidas.push(el)
                }else{
                    if(!rodadaEstipulada||rodada<=rodadaEstipulada)partidas.push(el)
                }
                //if(k==0)diminui=0
            }
        })
    };
    return rodadaEstipulada===false||rodadaEstipulada===null||rodadaEstipulada<0?partidas:{
        qtd:totais-diminui,parts:partidas
    }
}
const timesBra1=['amg','cap','cam','bah','bot','bra','cor','ctb','cru','cui','fla','flu','for','goi','gre','int','pal','san','sao','vas']
const timesIng1=['ars','ast','bou','bre','bri','bur','che','cry','eve','ful','liv','lut','man','cit','new','not','she','tot','wes','wol']
const timesEsp1=['ala','alm','atb','atm','bar','bet','cad','cel','get','gir','gra','las','mal','osa','ray','rem','res','sev','val','vil']
const timesIta1=['ata','bol','cag','emp','fio','fro','gen','int','juv','laz','lec','mil','mon','nap','rom','sal','sas','tor','udi','ver']
const timesBra2=['abc','ago','ava','bot','cea','cha','crb','cri','gua','itu','juv','lon','mir','nov','pon','sam','spo','tom','vil','vit']
const timesAle1=['aug','bay','boc','bor','col','dar','ein','fre','hei','hof','lei','lev','mai','mon','stu','uni','wer','wol']
