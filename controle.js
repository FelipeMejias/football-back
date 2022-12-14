import { bancoAle1, bancoEsp1, bancoIng1 } from "./bancos.js"
import { maiorId, salvarMongo } from "./db.js"

export async function adicionar(req,res){
    const {rodada,times,gols:goalsStr,camp}=req.body
    try {
      const partida=await moldarPartida(rodada,times,goalsStr)
      //bancoWc.unshift(partida)
      await salvarMongo(partida)
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.sendStatus(500)
    }
}

async function moldarPartida(rodada,times,goalsStr){
  const mandante=times[0]+times[1]+times[2]
  const visitante=times[3]+times[4]+times[5]
  let gols=[]
  if(goalsStr.length>0)gols=moldarGols(goalsStr)
    const id=await maiorId()
    console.log(id)
    const modeloPart={
      mandante,visitante,gols,
      rodada:parseInt(rodada),
      id,torneio:'c22'
    }
    return modeloPart
}

function moldarGols(goalsStr){
  const rawList=goalsStr.split(',')
    const goals=rawList.map(str=>{
      if(str[0]=='-')return -parseInt(str.replace('-',''))
      return parseInt(str)
    })
    
    const gols=[]
    for(let goal of goals){
       if(goal>=0){
           gols.push({mandante:true,minuto:goal})
       }else{
          gols.push({mandante:false,minuto:-goal})
       }
    }
    return gols
}