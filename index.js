import cors from 'cors'
import Express, {json} from 'express'
import axios from 'axios'
import { router } from './src/rotas.js'
import { bla } from './teste2.js'
function gc(){
    const lis=['ing','ale','esp','ita','fra','hol','por']
    let str1=''
    let str2=''
    for(let pal of lis){
    const palMai=pal[0].toUpperCase()+pal[1]+pal[2]
    str1+=`create${palMai}1,`
    str2+=`context${palMai}1,`}
    console.log(str1,str2)
}
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))

async function buscar(){
   
    
        const {data}= await axios.get(' https://api.football-data.org/v4/competitions/2013/matches',
            {headers: {'X-Auth-Token':process.env.V,}
        })
        //console.log(data.competitions.filter(it=>it.area.code=='BRA'))
        console.log(data)
}

