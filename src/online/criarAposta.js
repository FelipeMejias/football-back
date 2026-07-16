import pool from "../database.js";
import { decuparSelecoes } from "./decuparSelecoes.js";

export async function criarAposta(req, res) {

    const usuarioId = req.usuario.id;

    const {
        selecoes,
        valor
    } = req.body;
    const odd=decuparSelecoes(selecoes)
    const { rows } = await pool.query(
        `
        INSERT INTO apostas
        (
            usuario_id,
            selecoes,
            odd,
            valor
        )
        VALUES
        (
            $1,$2,$3,$4
        )
        RETURNING *
        `,
        [
            usuarioId,
            selecoes,
            odd,
            valor
        ]
    );

    res.status(201).json(rows[0]);
}