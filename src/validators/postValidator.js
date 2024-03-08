
export async function validatePost(req, res, next) {
    try {
        const {escant,gols}=req.body
        const le=escant.split(' ')
        const lg=gols.split(' ')
        console.log(escant)
        console.log(gols)
        let erro=false
        if(le.length!=2)erro=true
        for(let item of le){if(item.length!=1&&item.length!=2)erro=true}
        for(let item of lg){
            if(item.length==1){}else if(item.length==2){
            }else if(item.length==3&&item[0]=='0'){}else{erro=true}
        }
        if (erro) {
            console.log('Invalid input')
            return res.status(422).send({message: 'Invalid input'});
        }
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro");
    }
}