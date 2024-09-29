export default function filtrar(partidas,time,estadia){
    return partidas.filter(part=>{

        const nome=part[0]
        
        const mandante=nome[0]+nome[1]+nome[2]
        const visitante=nome[3]+nome[4]+nome[5]
        return(!estadia?(mandante==time||visitante==time):(
        estadia==1?mandante==time:visitante==time
    ))})
}
export function filtrarGols(gols,metade){
    return gols?gols.filter(gol=>{
        const minuto=gol>0?gol:-gol
        return (!metade?true:(
        metade==1?(minuto<=45):(minuto>45)
    ))}):[]
}
export function elPushar(time,valor1,valor2,valor3,cont,fixo,porcentado){
    const v=valor1*(porcentado?100:1)/cont
    const e=valor2*(porcentado?100:1)/cont
    const d=valor3*(porcentado?100:1)/cont
    const c1=cont==0?'-':parseFloat(v.toFixed(fixo))
    const c2=cont==0?'-':parseFloat(e.toFixed(fixo))
    const c3=cont==0?'-':parseFloat(d.toFixed(fixo))
    return {time,
        c1,
        c2,
        c3,
    }
}