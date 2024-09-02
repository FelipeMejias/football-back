import { buildResultado } from "./src/profundo/resultado.js"

export function bla(){
    const lista=[]
    for(let k=1.8;k<=3.5;k+=0.1){
        const {lucro,antigas}=buildResultado(['bra1'],['1','2','7','8'],90,k)
        lista.push({k:k.toFixed(1),amostra:antigas.length,lucro:parseFloat(lucro)})
    }
    const resp= lista.sort((a,b)=>{
        if(a.lucro>b.lucro){
            return -1
        }else{return true}
    })
    console.log([resp[0],resp[1],resp[2]])
}