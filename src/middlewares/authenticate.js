const jwt = require("jsonwebtoken");

const secret = "d99fab534aec8037440bcd4b6e7894b7";

exports.getToken = async (id) => {
    return jwt.sign({ id: id }, secret, { expiresIn: 1800 });
}

exports.validateToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401)
            .json({ error: "Não autorizado" });

    const parts = authHeader.split(" ");

    if (!parts.length === 2)
        return res.status(401)
            .json({ error: "Não autorizado" });

    const [scheme, token] = parts;

    if (scheme != "Bearer")
        return res.status(401)
            .json({ error: "Não autorizado" });

    jwt.verify(token, secret, (err, decoded) => {
    
        if (err){
            if (err.name === "TokenExpiredError")
                return res.status(401).json({ error: "Sessão inválida" });

            return res.status(401).json({ error: "Não autorizado" });
        }

        req.id = decoded.id;

        return next();
    });

};