const jwt = require("../middlewares/authenticate");
const userModel = require("../models/userModel");
const crypto = require("crypto");

exports.signUp = async (req, res) => {
    const user = { ...req.body };
    try {
        await validarSenha(user.senha);
        await validarNome(user.nome);
        await validarEmail(user.email);
        await validarTelefones(user.telefones);

        if (await userModel.getUserByEmail(user.email))
            throw { status: 400, message: "Email já cadastrado" };

        user.senha = crypto.createHmac("md5", user.senha).digest("hex");
        user.token = await jwt.getToken(user.id);

        const newUserId = await userModel.createUser(user);
        await userModel.updateUserToken(newUserId, user.token);
        const result = await userModel.getUserById(newUserId);

        return res.status(200).json(result);

    } catch (error) {
        if (error.status) {
            return res.status(error.status)
                .json({ erro: { message: error.message } });
        } else {
            return res.json(error);
        }
    }
}

exports.signIn = async (req, res) => {
    const { email, senha } = req.body;
    try {
        await validarSenha(senha);
        await validarEmail(email);
        const user = await userModel.getUserByEmail(email);

        if (!user)
            throw { status: 403, message: "Usuário e/ou senha inválidos" };

        if (user.senha !== crypto.createHmac("md5", senha).digest("hex"))
            throw { status: 401, message: "Usuário e/ou senha inválidos" };

        await userModel.updateUserToken(user.id, await jwt.getToken(user.id));
        await userModel.updateLogin(user.id);

        const result = await userModel.getUserById(user.id);

        return res.status(200).json(result);

    } catch (error) {
        if (error.status) {
            return res.status(error.status)
                .json({ erro: { message: error.message } });
        } else {
            return res.json(error);
        }
    }
}

exports.getUsers = async (req, res) => {

    const { id } = req.params;
    const token = req.headers.authorization;

    try {
        if (!id) throw { status: 400, message: "ID não informado !" };

        const user = await userModel.getUserById(id);

        if (token !== `Bearer ${user.token}`)
            throw { status: 401, message: "Não autorizado" };

        return res.status(200).json(user);
    } catch (error) {
        if (error.status) {
            return res.status(error.status)
                .json({ erro: { message: error.message } });
        } else {
            return res.json(error);
        }
    }
}

async function validarTelefones(telefones) {
    if (!telefones || telefones.length <= 0)
        throw { status: 400, message: "Nenhum telefone foi informado" };

    await telefones.map((fone) => {
    
        if (!fone.ddd || fone.ddd.trim().length === 0)
            throw { status: 400, message: "Telefone informado não possui DDD" };

        if (!fone.numero || fone.numero.trim().length === 0)
            throw { status: 400, message: "Numero não informado" };

        if (fone.ddd.trim().length !== 2)
            throw { status: 400, message: "Fomato do DDD invalido" };

        if (fone.numero.trim().length !== 8 && fone.numero.trim().length !== 9)
            throw { status: 400, message: "Fomato do Numero invalido" };
    });
}

async function validarEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.trim().length === 0)
        throw { status: 400, message: "Email não informado" };

    if (!re.test(String(email).toLowerCase()))
        throw { status: 400, message: "Email Invalido" };
}

async function validarNome(nome) {
    if (!nome || nome.trim().length === 0)
        throw { status: 400, message: "Nome não informado" };
}

async function validarSenha(senha) {
    if (!senha || senha.trim().length === 0)
        throw { status: 400, message: "Senha não informada" };
}