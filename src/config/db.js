import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

import { bancoAle1, bancoBra1novo, bancoBra1antigo, bancoEsp1, bancoIng1 } from "../bancos.js"
let db = null

export async function conectarBanco(){
    const mongoClient=new MongoClient(process.env.MONGO_URL)
    try{
        await mongoClient.connect()
        db=mongoClient.db(process.env.BANCO)
    }catch (error){
        console.log('Erro ao conectar ao banco')
        console.log(error)
    }
}


export async function salvarMongo(partida){
    await db.collection('fut').insertOne(partida)
}


export async function buscarMongo(){
    const partidas= await db.collection('fut').find({}).toArray()
    partidas.forEach(partida => {
        const {camp}=partida
        switch(camp){
            case 'bra1':
                bancoBra1
            ;break;
            case 'ing1':
                
            ;break;
            case 'esp1':
                
            ;break;
            case 'ale1':
                
            ;break
        }
    });
}
export async function maiorId(){
    const partidas= await db.collection('fut').find({}).toArray()
    if(partidas.length==0)return 500
    let maior=-Infinity
    partidas.forEach(partida => {
        if(partida.id>maior)maior=partida.id
    });
    return maior+1
}
