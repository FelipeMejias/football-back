import { ligas } from "../bancos.js";

export async function validateCamp(req, res, next) {
    try {
        const {camp}=req.params
        const camps=ligas.paths
        if (!camps.includes(camp)) {
            console.log('Invalid input0')
            return res.status(422).send({message: 'Invalid input'});
        }
        next();
    } catch (e) {
        console.log(e);
        return res.status(500).send("Ocorreu um erro");
    }
}