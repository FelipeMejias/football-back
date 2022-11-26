import { bancoAle1, bancoEsp1, bancoIng1, bancoWc } from "../bancos"

let idAjuda=500
export async function adicionar(req,res){
    const {rodada,times,gols:goalsStr,camp}=req.body
    let rawList=goalsStr.split(',')
    if(rawList.length<=1){
      rawList=goalsStr.replace('  ',' ').split(' ')
    }
    const goals=rawList.map(str=>{
      if(str[0]=='-')return -parseInt(str.replace('-',''))
      return parseInt(str)
    })
    const mandante=times[0]+times[1]+times[2]
    const visitante=times[3]+times[4]+times[5]
    const gols=[]
    for(let goal of goals){
       if(goal>=0){
           gols.push({mandante:true,minuto:goal})
       }else{
          gols.push({mandante:false,minuto:-goal})
       }
    }
    const modeloPart={
      mandante,visitante,gols,rodada:parseInt(rodada),id:idAjuda
    }
    idAjuda++
    if(camp=='wc'){
      bancoWc.unshift({...modeloPart,torneio:'c22'})
    }else if(camp=='ing1'){
      bancoIng1.unshift(modeloPart)
    }else if(camp=='esp1'){
        bancoEsp1.unshift(modeloPart)
    }else if(camp=='ale1'){
        bancoAle1.unshift(modeloPart)
    }
   res.sendStatus(200)
}