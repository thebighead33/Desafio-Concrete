const databaseConect = require('../config/database');

exports.getUserByEmail = async (email) => {
    const user = await databaseConect('users')
        .select('*')
        .where('visivel', 1)
        .where('email', email)
        .first();

    return user;
}

exports.getUserById = async (id) => {
    const user = await databaseConect('users')
        .select('id', 'nome', 'email', 'data_criacao', 'data_atualizacao', 'ultimo_login', 'token')
        .where('visivel', 1)
        .where('id', id)
        .first();

    user.telefones = await getFoneByUserId(id);

    return user;
}

exports.createUser = async (user) => {
    const newUserId = await databaseConect('users')
        .insert({
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            ultimo_login: new Date(),
            data_criacao: new Date
        });

    if (!newUserId) throw { status: 400, message: 'Falha na inserção dos dados' };

    await user.telefones.map((fone) => {
        createFone(fone, newUserId);
    });

    return newUserId;
}

exports.updateUserToken = async (userId, token) => {
    const result = await databaseConect('users')
        .where('id', userId)
        .update({
            token: token
        });

    if (!result) throw { status: 400, message: 'Falha na alteração dos dados' };

    return result;
}

exports.updateLogin = async (userId) => {
    const result = await databaseConect('users')
        .where('id', userId)
        .update({
            ultimo_login: new Date()
        });

    if (!result) throw { status: 400, message: 'Falha na alteração dos dados' };

    return result;
}

async function createFone(fone, userId) {
    const result = await databaseConect('fone')
        .insert({
            ddd: fone.ddd,
            numero: fone.numero,
            fone_user: userId
        });

    if (!result) throw { status: 400, message: 'Falha na inserção dos dados' };

    return result;
}

async function getFoneByUserId(userId) {
    const result = await databaseConect('fone')
        .select('ddd', 'numero')
        .where('visivel', 1)
        .where('fone_user', userId);

    return result;
}
