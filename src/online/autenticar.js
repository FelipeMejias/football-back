import jwt from "jsonwebtoken";

export function autenticar(req, res, next) {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ erro: "Token não enviado." });
    }

    const token = auth.split(" ")[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = payload;

        next();
    } catch {
        return res.status(401).json({ erro: "Token inválido." });
    }
}