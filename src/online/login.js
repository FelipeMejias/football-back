import { OAuth2Client } from "google-auth-library";
import pool from "../database.js";
import jwt from "jsonwebtoken";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleLogin(req, res) {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({
                erro: "Token não enviado."
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const nome = payload.given_name;
        const email = payload.email;

        // Procura usuário
        const { rows } = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        let usuario = rows[0];

        // Se não existir, cria
        if (!usuario) {
            const resultado = await pool.query(
                `
                INSERT INTO usuarios (nome, email)
                VALUES ($1, $2)
                RETURNING *
                `,
                [nome, email]
            );

            usuario = resultado.rows[0];
        }
        const jwtToken = jwt.sign(
    {
        id: usuario.id,
        email: usuario.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "30d"
    }
);
        return res.json({
    token: jwtToken,
    usuario
});

    } catch (err) {
        console.error(err);
        return res.status(401).json({
            erro: "Login inválido."
        });
    }
}