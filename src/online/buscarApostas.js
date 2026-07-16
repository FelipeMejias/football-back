import pool from "../database.js";
import { buildApostas } from '../especiais/buildApostas.js'

export async function buscarApostas(req, res) {
    try {
        const usuarioId = req.usuario.id;

        const { rows } = await pool.query(
            `
            SELECT *
            FROM apostas
            WHERE usuario_id = $1
            ORDER BY id DESC
            `,
            [usuarioId]
        );
        const apostas=buildApostas(2)
        console.log(rows)
        const combs=rows.map(comb=>{
            const {selecoes,valor}=comb
            const aps=selecoes.split('+')
            return {aps,valor}
        })
        return res.json({apostas,combs});

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            erro: "Erro ao buscar apostas."
        });
    }
}