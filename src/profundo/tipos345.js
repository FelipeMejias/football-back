/*
frases=[
    [['com primeiro gol marcado mais tarde',false],['com primeiro gol marcado mais cedo',true]],
    [['com primeiro gol da partida mais tarde',null],['com primeiro gol da partida mais cedo',null]],
    [['com primeiro gol sofrido mais tarde',true],['com primeiro gol sofrido mais cedo',false]],
]

for(let i=0;i<=2;i++){
        const list=fucarTabela(primeiroGol(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c,relev}=item
            resp.push({
                pos,
                descricao:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                relev:RELEVANCIA3-(i?1:0),
                c,
                asc,
                grandeza:3,
                estadia:i,
                metade:null,
                handicap:null
            })
        })
}
frases=[
    [['com último gol marcado mais tarde',true],['com último gol marcado mais cedo',false]],
    [['com último gol da partida mais tarde',null],['com último gol da partida mais cedo',null]],
    [['com último gol sofrido mais tarde',false],['com último gol sofrido mais cedo',true]],
]
for(let i=0;i<=2;i++){
        const list=fucarTabela(ultimoGol(context,i),time)
        list.forEach(item=>{
            const {pos,asc,valor,c,relev}=item
            resp.push({
                pos,
                descricao:frases[c-1][asc][0]+complementos2[i],
                bom:frases[c-1][asc][1],
                valor,
                relev:RELEVANCIA4-(i?1:0),
                c,
                asc,
                grandeza:4,
                estadia:i,
                metade:null,
                handicap:null
            })
        })
}
frases=[
    [['que mais marca gol',true],['que menos marca gol',false]],
    [['com menos gols na partida',null],['com mais gols na partida',null]],
    [['que mais sofre gol',false],['que menos sofre gol',true]],
]
complementos=[
    ' quando está perdendo',' quando está empatando',' quando está vencendo'
]
for(let i=-1;i<=1;i++){
    const list=fucarTabela(comparar(context,i),time,true)
    list.forEach(item=>{
        const {pos,asc,valor,c,relev}=item
        resp.push({
            pos,
            descricao:frases[c-1][asc][0]+complementos[i+1],
            bom:frases[c-1][asc][1],
            valor,
            relev:RELEVANCIA5,
            c,
            asc,
            grandeza:5,
            estadia:null,
            metade:null,
            handicap:i
        })
    })
}
*/