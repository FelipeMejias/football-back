import { ligas } from "../bancos.js";

export function validateTime(palavra1,palavra2='unico'){
    return async(req, res, next) => {
        try {
            const camp=req.params.camp
            const {paths,contexts}=ligas
            const times=contexts[paths.indexOf(camp)].listaTimes
            const caso1=req.params[palavra1]
            if(palavra1==='manvis'){
                const mandante=caso1[0]+caso1[1]+caso1[2]
                const visitante=caso1[3]+caso1[4]+caso1[5]
                if (!times.includes(mandante)||!times.includes(visitante)) {
                    console.log('Invalid input1')
                    return res.status(422).send({message: 'Invalid input'});
                }
            }else if(!times.includes(caso1)){
                
                console.log('Invalid input2')
                return res.status(422).send({message: 'Invalid input'});
            }
            const caso2=req.params[palavra2]
            if(palavra2!=='unico' && !times.includes(caso2)){
                console.log('Invalid input3')
                return res.status(422).send({message: 'Invalid input'});
            }
            next();
        } catch (e) {
            console.log(e);
            return res.status(500).send("Ocorreu um erro");
        }
        
    }
}