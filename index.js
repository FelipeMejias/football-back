import cors from 'cors'
import Express, {json} from 'express'
import { router } from './src/rotas.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4001
app.listen(port,()=>console.log(`listening on port ${port}`))


function carro(){
    const lista=[
        'Amazonas FC','América MG','Avaí','Botafogo SP','Brusque','Ceará','Chapecoense','Coritiba','CRB','Goiás',
        'Guarani','Ituano','Mirassol','Novorizontino','Operário','Paysandu','Ponte Preta','Santos','Sport Recife','Vila Nova',
    ]
    let string=''
    for(let item of lista){
        console.log(`import ${item} from '../escudos/bra2/${item}.png'`)
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