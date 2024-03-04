import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
import { buildApostas } from './src/especiais/buildApostas.js'
import { indicar } from './src/adicionadas/indicar.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4001
app.listen(port,()=>console.log(`listening on port ${port}`))

export const tetoPosicao=5
indicar()