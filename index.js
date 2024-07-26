import cors from 'cors'
import Express, {json} from 'express'
import axios from 'axios'
import { router } from './src/rotas.js'
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
}await buscar()



function carro(){
    const lista=[
        'AIK','Brommapojkarna','Djurgarden','Elfsborg','GAIS','Gotemburgo','Hacken','Halmstad',
        'Hammarby','Kalmar','Malmo','Mjallby','Norrkoping','Sirius','Varnamo','Vasteras'
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
function onda(){
    let str='['
    for(let k=1;k<=191;k++){
        let numero=k
        if(k<10){
            numero=`00${k}`
        }else if(k<100){
            numero=`0${k}`
        }
        str+=`onda${numero},`
    }
    str+=']'
    console.log(str)
}