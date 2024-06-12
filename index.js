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
        'Albirex Nigata','Kashiwa Antlers','Avispa','Cerezo Osaka','Consadole Sapporo','Frontale','Gamba Osaka','Júbilo Iwata','Kashiwa Reysol','Kyoto Sanga',
        'Machida Zelvia','Nagoya Grampus','Sagan Tosu','Sanfrecce Hiroshima','Shonan','FC Tokyo','Urawa Reds','Tokyo Verdy','Vissel Kobe','Yokohama Marinos',
    ]
    let string=''
    for(let item of lista){
        console.log(`import ${item} from '../escudos/jap1/${item}.png'`)
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