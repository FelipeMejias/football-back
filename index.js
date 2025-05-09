import cors from 'cors'
import Express, {json} from 'express'
import axios from 'axios'
import { router } from './src/rotas.js'

const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4001
app.listen(port,()=>console.log(`listening on port ${port}`))

async function buscar(){
    const {data}=  axios.get(' https://api.football-data.org/v4/competitions/2013/matches',
        {headers: {'X-Auth-Token':process.env.V,}
    })
        //console.log(data.competitions.filter(it=>it.area.code=='BRA'))
        console.log(data)
}



