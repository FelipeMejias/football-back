import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { indicar } from './src/adicionadas/indicar.js'
import { buildApostas } from './src/especiais/buildApostaNovo.js'
import { deixarSomenteAsMaioresDeGols } from './src/profundo/resultado.js'
import { maisOuMenos } from './teste.js'
import { bla } from './teste2.js'
import { createArg1 } from './src/adicionadas/p6_ARG.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4001
app.listen(port,()=>console.log(`listening on port ${port}`))
export const tetoPosicao=5
indicar()
function d(){
    return console.log(createArg1.length)
    for( let p of createArg1){
        const n=p[0]
        if(n[0]+n[1]+n[2]=='riv'||n[3]+n[4]+n[5]=='riv')console.log(p)
    }
}d()

function carro(){
    const lista=[
        'aguia',
        'elefante','formiga',
        'girafa','golfinho',
        'leao','orca','orni',
        'pinguim','rino','sapo','tigre',
        'canguru','cobra','estrela','foca','marin',
        'pato','tartaruga','dino'
    ]
    for(let item of lista){
        console.log(`import ${item} from './animais/${item}.jpg'`)
    }
}function invert(){
    const lista=[
      
    ]
    for(let item of lista.reverse()){
        console.log(item)
    }
}