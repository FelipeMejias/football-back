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


function carro(){
    const lista=[
        'Atlanta United','Austin','Columbus Crew','Charlote FC','Chicago Fire',
        'Cincinnati','Colorado Rapids','FC Dallas','DC United','Houston Dynamo',
        'Inter Miami','LAFC','LA Galaxy','Minnesota Union','Montréal',
        'Nashville SC','New England','New York City FC','Orlando City','Philadelphia Union',
        'Portland Timbers','Real Salt Lake','NY Red Bulls','San José','Seattle Sounders',
        'St Louis City','Sporting KC','Toronto','Whitecaps',
    ]
    let string=''
    for(let item of lista){
        console.log(`import ${item} from '../escudos/${item}.png'`)
        string+=`${item},`
    }
    console.log(string)
}
function invert(){
    const lista=[
      
    ]
    for(let item of lista.reverse()){
        console.log(item)
    }
}