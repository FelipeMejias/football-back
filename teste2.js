import { buildResultado } from "./src/profundo/resultado.js"

export function bla(){
    const lista=[]
    for(let k=70;k<=100;k+=5){
        const {lucro}=buildResultado(['ing1','ita1','ale1','fra1','esp1'],['6'],k)
        lista.push(parseFloat(lucro))
    }
    console.log(lista)
}