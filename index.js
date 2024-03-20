import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { indicar } from './src/adicionadas/indicar.js'
import { buildApostas } from './src/especiais/buildApostas.js'
import { ligas } from './src/bancos.js'
import { buildFutura } from './src/especiais/buildFutura.js'
import { buildResultado, deixarSomenteAsMaioresDeGols } from './src/profundo/resultado.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4002
app.listen(port,()=>console.log(`listening on port ${port}`))

export const tetoPosicao=5
indicar()
grande()
function grande(){
    const camps=[
        'ing1',
        'ale1',
        'fra1',
        'ita1',
        'esp1',

    ]
    const tipos=['1',]
    const resposta=[]
    for(let k=85;k<95;k++){
        const ev=k
        const apostas=buildApostas(3).filter(a=>(camps.includes(a.camp)&&tipos.includes(a.info[0])&&a.ev>=ev))
        let din=0;let ganho=0;let red=0;let green=0;
        for(let apo of deixarSomenteAsMaioresDeGols(apostas)){
            din++
            if(apo.green)ganho+=apo.odd
        }
        let din2=0;let ganho2=0;let red2=0;let green2=0;
        for(let apo of apostas){
            din2++
            if(apo.green)ganho2+=apo.odd
        }
        const lucro=calcularLucro(ganho,din)
        const lucro2=calcularLucro(ganho2,din2)
        resposta.push({ev,amostra:din,lucro:parseFloat(lucro)})
        //console.log(`ev ${ev} antigo[ ${din2} lucro ${lucro2}]`)
    }
    let cont=0
    for(let item of resposta)cont+=item.lucro
    console.log(cont)
    /*const ordenada= resposta.sort((a,b)=>{
        let caso=false
        if(a.lucro==b.lucro&&a.amostra>b.amostra){caso=true}else if(a.lucro>b.lucro){caso=true}
        if(caso){return -1}else{return true}
    })
    console.log(ordenada)  */
}




function calcularLucro(ganho,din){
    const lucroRaw=ganho/din
    const lucroMedium=((lucroRaw%1)*100).toFixed(1)
    return lucroRaw>1?lucroMedium:-(100-lucroMedium)
}

/*
mais de 2 pra bologna
menos de 1 no 1T (boc x dar)
menos de 1 pra alaves
*/