import {MongoClient} from 'mongodb'
import cors from 'cors'
import Express, {json} from 'express'
import { router } from './rotas.js'

const app=Express()
app.use(cors())
app.use(json())
app.use(router)
export let db=null
const mongoClient=new MongoClient("mongodb://localhost:27017")
const promessa= mongoClient.connect()
promessa.then(async()=>{
    db=mongoClient.db("futebol")


    
    await getPartidas()
})
promessa.catch(()=>console.log('erro conectando ao banco'))
app.listen(4000,()=>console.log('listening on 4000'))
/*
let id=;const r=
    id++ //1
    await create(id,r,'',[])
    id++ //2
    await create(id,r,'',[])
    id++ //3
    await create(id,r,'',[])
    id++ //4
    await create(id,r,'',[])
    id++ //5
    await create(id,r,'',[])
    id++ //6
    await create(id,r,'',[])
    id++ //7
    await create(id,r,'',[])
    id++ //8
    await create(id,r,'',[])
    id++ //9
    await create(id,r,'',[])
    id++ //10
    await create(id,r,'',[])
    
*/
async function create(id,rodada,times,gols){
    const mandante=times[0]+times[1]+times[2]
    const visitante=times[3]+times[4]+times[5]
    await partida(id,rodada,mandante,visitante)
    for(let goal of gols){
        if(goal>=0){
            await gol(id,goal)
        }else{
            await gol(id,-goal,false)
        }
    }
}

async function partida(id,rodada,mandante,visitante){
    await db.collection('partidas').insertOne({id,rodada,mandante,visitante})
}

async function gol(partidaId,minuto,bool=true){
    const {mandante,visitante}=await db.collection('partidas').findOne({id:partidaId})
    await db.collection('gols').insertOne({partidaId,
        marcador:bool?mandante:visitante,
        sofredor:bool?visitante:mandante,
        minuto})
}

async function apagar(a,b){
    await db.collection('partidas').deleteMany({id:a,rodada:b})
}

async function getPartidas(){
    const tudo=await db.collection('partidas').find({}).toArray()
    console.log('partidas',tudo.length)
}
async function getGols(part){
    const mandante=part[0]+part[1]+part[2]
    const visitante=part[3]+part[4]+part[5]
    const partida=await db.collection('partidas').findOne({
        mandante,visitante
    })
    const tudo=await db.collection('gols').find({partidaId:partida.id}).toArray()
    console.log('gols',tudo)
}
