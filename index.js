import cors from 'cors'
import Express, {json} from 'express'
import { router } from './rotas.js'
import dotenv from 'dotenv'
dotenv.config()
import {iniciateDatabases} from './bancos.js'

const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))

iniciateDatabases()