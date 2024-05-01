import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { indicar } from './src/adicionadas/indicar.js'
import { buildApostas } from './src/especiais/buildApostaNovo.js'
import { deixarSomenteAsMaioresDeGols } from './src/profundo/resultado.js'
import { maisOuMenos } from './teste.js'
import { bla } from './teste2.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4001
app.listen(port,()=>console.log(`listening on port ${port}`))
bla()
export const tetoPosicao=5
indicar()
//maisOuMenos()
//lancarTodas()
function lancarTodas(){
    const camps=['ing1','ita1','ale1','fra1','esp1','hol1','por1']
    for(let kam of camps){
        escolherQuantidades(kam)
    }
}
function escolherQuantidades(camp){
    const listaTotal=[]
    for(let a=1;a<=15;a++){
        for(let b=1;b<=15;b++){
            //if(b==5&&a==3)console.log(`carregando...( ${a} / 10 )`)
            //if(a<=b){
                const novo=calcular(camp,a,b)
                listaTotal.push(novo)
            //}
        }
    }/*
    const ordLucro=listaTotal.sort((a,b)=>{
        if(a.maiorLucro>b.maiorLucro){
            return -1
        }else{return true}
    })
    const ordSomado=listaTotal.sort((a,b)=>{
        if(a.somado>b.somado){
            return -1
        }else{return true}
    })*/

    const ordAmostra=listaTotal.sort((a,b)=>{
        if(a.amostra>b.amostra){
            return -1
        }else{return true}
    })
    const lista=[]
    let amostraEmQuestao=ordAmostra[0].amostra
    let separado=ordAmostra[0]
    for(let item of ordAmostra){
        if(item.amostra==amostraEmQuestao){
            if(item.maiorLucro>separado.maiorLucro)separado=item
        }else{
            amostraEmQuestao=item.amostra
            lista.push(separado)
            separado=item
        }
    }
    console.log(`=====================${camp}======================`)
    console.log(lista)
    /*
    console.log(ordLucro[0])
    console.log(ordLucro[1])
    console.log(ordLucro[2])
    console.log(ordLucro[3])
    console.log(ordLucro[4])
    console.log(`-                                                -`)
    console.log(ordSomado[0])
    console.log(ordSomado[1])
    console.log(ordSomado[2])
    console.log(ordSomado[3])
    console.log(ordSomado[4])*/

    console.log(`==================================================`)
}

function calcular(camp,qtd1,qtd2){
    const tipo='1'
    let lucroTot=0
    let maiorLucro=-Infinity
    let amostra=null
    let evCorr=null
    const todas=buildApostas(qtd1,qtd2)
    for(let k=70;k<=100;k+=5){
        const ev=k
        const apostas=todas.filter(a=>(a.camp==camp&&a.info[0]==tipo&&a.ev>=ev))
        const listaFinal=apostas
        //const listaFinal=deixarSomenteAsMaioresDeGols(apostas)
        let din=0;let ganho=0;let red=0;let green=0;
        for(let apo of listaFinal){
            din++
            if(apo.green)ganho+=apo.odd
        }
        const lucro=calcularLucro(ganho,din)
        lucroTot+=lucro
        if(lucro>maiorLucro){
            maiorLucro=lucro
            amostra=din
            evCorr=ev
        }
    }
    const objeto={
        qtd1,qtd2,
        maiorLucro:parseFloat(maiorLucro.toFixed(1)),
        amostra,
        evCorr,
        somado:parseFloat(lucroTot.toFixed(1))
    }
    return objeto
}


function calcularLucro(ganho,din){
    const lucroRaw=ganho/din
    const lucroMedium=((lucroRaw%1)*100)
    const resp=lucroRaw>1?lucroMedium:-(100-lucroMedium)
    return resp
}
