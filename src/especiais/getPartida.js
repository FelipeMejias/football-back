export function getPartida(banco,id){
    for(let part of banco){
        if(part[0]==id){
            return create(part)
        }
    }
}
function create(part){
    const manvis=part[0]
    let data
    let escant
    let goals
    if(part[1].length==2){
        escant=part[1]
        goals=part[2]
    }else{
        data=part[1]
        escant=part[2]
        goals=part[3]
    }
    const mandante=manvis[0]+manvis[1]+manvis[2]
    const visitante=manvis[3]+manvis[4]+manvis[5]
    const gols=[]
    let man=0
    let vis=0
    for(let goal of goals){
       if(goal>=0){
             man++
           gols.push({mandante:true,minuto:goal})
       }else{
         vis++
          gols.push({mandante:false,minuto:-goal})
       }
    }
    const partida={data,mandante,visitante,escant,gols,placar:[man,vis]}
    return partida
}

