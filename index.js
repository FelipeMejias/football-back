import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))


function carro(){
    const lista=[
        'Boston River','Cerro','Danubio','Defensor','Deportivo Maldonado','Fênix','Cerro Largo','Liverpool',
        'Miramar Misiones','Montevideo Wanderers','Nacional','Peñarol','Progreso','Racing','Rampla','River Plate'
    ]
    let string=''
    for(let item of lista){
        console.log(`import ${item} from './escudos/${item}.png'`)
        string+=`${item},`
    }
    console.log(string)
}
function invert(){
    const lista=[
        ['brajuv','2406151830'],
        ['fluago','2406152100'],
        ['corsao','2406161600'],
        ['vitint','2406161600'],
        ['capfla','2406161600'],
        ['vascru','2406161830'],
        ['cribah','2406161830'],
        ['grebot','2406161830'],
        ['cuifor','2406161830'],
        ['campal','2406172030'],
       
    ]
    for(let item of lista.reverse()){
        console.log(`['${item[0]}','${item[1]}'],`)
    }
}