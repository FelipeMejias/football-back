import cors from 'cors'
import Express, {json} from 'express'
import { router } from './rotas.js'
import dotenv from 'dotenv'
dotenv.config()
import {iniciateDatabases} from './bancos.js'
const app=Express()
app.use(cors())
app.use(json())
app.use(router)
const port =process.env.PORT||4000
app.listen(port,()=>console.log(`listening on port ${port}`))

import dayjs from 'dayjs'
iniciateDatabases()
function ptNow(){
    const str=new Date().toLocaleString("en-US", {timeZone: "America/Sao_Paulo"})
    const list=str.split(', ')
    const date=list[0];
    const arr=date.split('/')
    const finalDate=`${arr[2]}-${arr[0].length==2?arr[0]:`0${arr[0]}`}-${arr[1].length==2?arr[1]:`0${arr[1]}`}`
    const time=list[1].split(' ')
    const parts=time[0].split(':')
    let hour=parseInt(parts[0])
    if(time[1]=='PM')hour+=hour==12?0:12
    const finalTime=`${hour>9?hour:`0${hour}`}:${parts[1].length==2?parts[1]:`0${parts[1]}`}:${parts[2].length==2?parts[2]:`0${parts[2]}`}`
    const resp=`${finalDate} ${finalTime}`
    return resp
}
export function defineTimeOut(hor){
    const time=hor[0]+hor[1]+':'+hor[2]+hor[3]
    const now=ptNow()
    const arr=now.split(' ')
    const date=dayjs((time>arr[1]?arr[0]:dayjs(arr[0]).add('1', 'day').format('YYYY-MM-DD'))+' '+time)
    const resp= date.diff(dayjs(now), 'second', true)
    const timeOut=resp
    return `faltam ${Math.floor(timeOut/86400)} dias, ${Math.floor(timeOut%86400/3600)} horas e ${Math.floor(timeOut%86400%3600/60)} minutos`
}