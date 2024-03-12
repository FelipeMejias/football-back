import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { indicar } from './src/adicionadas/indicar.js'
import { buildApostas } from './src/especiais/buildApostas.js'
import { ligas } from './src/bancos.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4002
app.listen(port,()=>console.log(`listening on port ${port}`))

export const tetoPosicao=5
indicar()
function calcularEV(chance,odd,k,g){
    const numero=odd*chance*k
    const resp=numero-(100-chance)*g
    return resp
}
const camps=['ing','fra','ale']
const tipos=['1','2','6']
const amostraMinima=45
function tr(){
    const listaTotal=[]
    
    const apostasRaw=buildApostas(3)
    for(let uv=80;uv<100;uv++){
        for(let g=0.9;g<1.1;g+=0.01){
            for(let k=0.9;k<1.1;k+=0.01){
                const no=nova(apostasRaw,k,g,uv)
                
                if(no.lucro)listaTotal.push(no)
            }
        }

    }
    
    let cont=0
    const resp=listaTotal.filter(obj=>obj.amostra>amostraMinima)
    const resposta=resp.sort((a,b)=>{if(a.taxa>b.taxa){return -1}else{return true}})
    while(cont<10){
        console.log(resposta[cont])
        cont++
    }
}
    

function nova(apostasRaw,k,g,evMinimo){
    const apostas=apostasRaw.filter(a=>{
    const caso=calcularEV(a.chance,a.odd,k,g)
    return (camps.includes(a.camp.replace('1',''))&&
        tipos.includes(a.info[0])&&
        caso>=evMinimo)})
    let din=0;let ganho=0;let red=0;let green=0;
    for(let ap of apostas){
        if(ap.green===null||ap.green===undefined){
            din++
            ganho+=ap.odd
        }else{
            din++
            if(ap.green)ganho+=ap.odd
            if(ap.green){green++}else{red++}
        }
    }
    const porc=Math.round((green/din)*100)
    const lucroRaw=ganho/din
    const lucroMedium=Math.round((lucroRaw%1)*100)
    const lucro=lucroRaw>1?lucroMedium:-(100-lucroMedium)
    return {
        k:k.toFixed(2),
        g:g.toFixed(2),
        ev:evMinimo,
        lucro,
        
        taxa:porc,
        amostra:din,
    }
}