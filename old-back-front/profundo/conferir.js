import { confEsc } from "../tabelas/confEsc.js"
import { confGols } from "../tabelas/confGols.js"
import { confPlacar } from "../tabelas/confPlacar.js"

export function conferir(context,grandeza,c,asc,estadia,metade,valor,time){
    let frases
    let complementos=[
        '',' no 1º tempo',' no 2º tempo'
    ]
    let complementos2=[
        '',' em casa',' fora de casa'
    ]
    if(grandeza==1){
        let frases=[
            [['vitórias',true],['empate ou derrota',false]],
            [['empates',null],['vitória ou derrota',null]],
            [['derrotas',false],['vitória ou empate',true]],
        ]
        const chance=confPlacar(context,estadia,metade,time,c,asc,valor)
        return {
            chance,
            texto:frases[c-1][asc][0]+complementos[metade]+complementos2[estadia],
            bom:frases[c-1][asc][1],
            c,
            asc,
            grandeza:1,
            estadia,
            metade,
        }
    }
    if(grandeza==2){
        frases=[
            [[`mais de ${valor} gols marcados`,true],[`menos de ${valor} gols marcados`,false]],
            [[`mais de ${valor} gols`,null],[`menos de ${valor} gols`,null]],
            [[`mais de ${valor} gols sofridos`,false],[`menos de ${valor} gols sofridos`,true]],
        ]
        const chance=confGols(context,estadia,metade,time,c,asc,valor)
        return {
            chance,
            texto:frases[c-1][asc][0]+complementos[metade]+complementos2[estadia],
            bom:frases[c-1][asc][1],
            c,
            asc,
            grandeza:2,
            estadia,
            metade,
        }
    }
    if(grandeza==6){
        frases=[
            [[`mais de ${valor} escanteios a favor`,true],[`menos de ${valor} escanteios a favor`,false]],
            [[`mais de ${valor} escanteios`,null],[`menos de ${valor} escanteios`,null]],
            [[`mais de ${valor} escanteios contra`,false],[`menos de ${valor} escanteios contrários`,true]],
        ]
        const chance=confEsc(context,estadia,metade,time,c,asc,valor)
        return {
            chance,
            texto:frases[c-1][asc][0]+complementos2[estadia],
            bom:frases[c-1][asc][1],
            c,
            asc,
            grandeza:6,
            estadia,
            metade,
        }
    }    
}