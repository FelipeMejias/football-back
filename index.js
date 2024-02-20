import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { buildFutura } from './src/especiais/buildFutura.js'
import { buildContext } from './src/bancos.js'
import { criarOrdemDuplaAposta } from "./src/adicionadas/indicar.js"
import detalhar from './src/adicionadas/detalhar.js'
import { buildApostas } from './src/especiais/buildApostas.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)

function auto(){
    const futuras=buildFutura()
    const lista=[]
    for(let partida of futuras){
        const {camp,mandante,visitante,data}=partida
        if(camp=='1'){
            const context=buildContext(camp)
            criarOrdemDuplaAposta(context,camp,mandante,visitante,2)
        }
    }
}
auto()

const port =process.env.PORT||4003
app.listen(port,()=>console.log(`listening on port ${port}`))
