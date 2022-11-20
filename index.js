import cors from 'cors'
import Express, {json} from 'express'
import { router } from './rotas.js'
import dotenv from 'dotenv'
import {iniciateDatabases} from './bancos.js'
dotenv.config()
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))

iniciateDatabases()



/*
const cup=['cat','equ','sen','hol','ing','ira','eua','gal','arg','ara','mex','pol','din','tun','fra','aus','ale','jap','esp','crc','mar','cro','bel','can','sui','cam','bra','ser','uru','cor','por','gan']
function maisPartidas(){
   bancoWc.forEach(part=>{
      const {mandante,visitante}=part
      if(contagem[mandante]){
         contagem[mandante]=contagem[mandante]+1
      }else{contagem[mandante]=1}

      if(contagem[visitante]){
         contagem[visitante]=contagem[visitante]+1
      }else{contagem[mandante]=1}
    })
    cup.forEach(time=>{
      console.log(time,contagem[time])
    })
}

function partidasCruzadas(list){
   const lista=bancoFake.filter(part=>(
         list.includes(part.mandante)&&list.includes(part.visitante)
         ))
   lista.forEach(p=>{
      const {rodada,mandante,visitante,gols}=p
      let man=0;let vis=0
      gols.forEach(g=>{
         if(g.mandante){man++}else{vis++}
      })
      console.log(`(${rodada}) ${mandante} ${man} x ${vis} ${visitante} `)
   })
}
bancoFake.forEach(part=>{
      const {gols,mandante,visitante,rodada}=part
      const t=['amg','cap','ago','cam','ava','bot','bra','cea','cor','ctb','cui','fla','flu','for','goi','int','juv','pal','san','sao']
      let man=0;let vis=0
      for(let gol of gols){
         if(gol.mandante){
            man++
         }else{vis++}
      }
      console.log(`${mandante} ${man} x ${vis} ${visitante}`)
      if(id%10==0)console.log(`---------------rodada ${rodada+1}`)
    })
    */