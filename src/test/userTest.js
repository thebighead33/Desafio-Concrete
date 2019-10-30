const assert = require('assert');
const axios = require('axios');

const url = 'http://localhost:8080';

exports.test = () => {
    describe('User Tests', () => {
        describe('Sign Up', () => {
            it('#Sign Up True', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123456",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body);
            
                assert.ok(result.data);
            });

            it('#Email já cadastrado', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": "catanho333@gmail.com",
                    "senha": "123456",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Email já cadastrado" }};

                assert.deepEqual(result, expected);
            });

            it('#Senha não informada', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "telefones": [
                        {
                          "numero": "123456789",
                          "ddd": "11"
                        }
                      ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Senha não informada" }};
                assert.deepEqual(result, expected);
            });

            it('#Senha vazia', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Senha não informada" }};
                assert.deepEqual(result, expected);
            });

            it('#Senha em branco', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": " ",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Senha não informada" }};
                assert.deepEqual(result, expected);
            });

            it('#Nome não informado', async () => {
                const body = {
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123456",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                    
                const expected = { erro: { message:"Nome não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Nome vazio', async () => {
                let body = {
                    "nome": "",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "12346",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Nome não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Nome em branco', async () => {
                let body = {
                    "nome": "  ",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "1123123",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Nome não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email não informado', async () => {
                let body = {
                    "nome": "Thiago Martins",
                    "senha": "1123123",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email vazio', async () => {
                let body = {
                    "nome": "Thiago Martins",
                    "email": "",
                    "senha": "1123123",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email em branco', async () => {
                let body = {
                    "nome": "Thiago Martins",
                    "email": "  ",
                    "senha": "1123123",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email invalido', async () => {
                let body = {
                    "nome": "Thiago Martins",
                    "email": "catanho...",
                    "senha": "1123123",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email Invalido" }};
                assert.deepEqual(result, expected);
            });

            it('#Telefones não informados', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445"
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Nenhum telefone foi informado" }};
                assert.deepEqual(result, expected);
            });

            it('#DDD não informado', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero": "123456789"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Telefone informado não possui DDD" }};
                assert.deepEqual(result, expected);
            });

            it('#DDD vazio', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": ""
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Telefone informado não possui DDD" }};
                assert.deepEqual(result, expected);
            });

            it('#DDD em branco', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero": "123456789",
                            "ddd": " "
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Telefone informado não possui DDD" }};
                assert.deepEqual(result, expected);
            });

            it('#Numero não informado', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Numero não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Numero vazio', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero" : "",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Numero não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Numero em branco', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero" : " ",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Numero não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Numero < 8', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero" : "1234567",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Fomato do Numero invalido" }};
                assert.deepEqual(result, expected);
            });

            it('#Numero > 9', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero" : "12345678910",
                            "ddd": "11"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Fomato do Numero invalido" }};
                assert.deepEqual(result, expected);
            });

            it('#DDD < 2', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero" : "123456789",
                            "ddd": "1"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Fomato do DDD invalido" }};
                assert.deepEqual(result, expected);
            });

            it('#DDD > 2', async () => {
                const body = {
                    "nome": "Thiago Martins",
                    "email": `catanho${(Math.random() * 999)}@gmail.com`,
                    "senha": "123445",
                    "telefones": [
                        {
                            "numero" : "123456789",
                            "ddd": "123"
                        }
                    ]
                }
                const result = await axios.post(`${url}/signup`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Fomato do DDD invalido" }};
                assert.deepEqual(result, expected);
            });
        });
        describe('Sign In', () => {
            it('#Sign In True', async () => {
                const body = {
                    "email": "catanho333@gmail.com",
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)

                assert.ok(result.data);
            });

            it('#Senha não informada', async () => {
                const body = {
                    "email": "catanho333@gmail.com"
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Senha não informada" }};
                assert.deepEqual(result, expected);
            });

            it('#Senha vazia', async () => {
                const body = {
                    "email": "catanho333@gmail.com",
                    "senha": "",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});

                const expected = { erro: { message:"Senha não informada" }};
                assert.deepEqual(result, expected);
            });

            it('#Senha em branco', async () => {
                const body = {
                    "email": "catanho333@gmail.com",
                    "senha": " ",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Senha não informada" }};
                assert.deepEqual(result, expected);
            });

            it('#Email não informado', async () => {
                const body = {
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email vazio', async () => {
                const body = {
                    "email": "",
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email em branco', async () => {
                const body = {
                    "email": " ",
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email não informado" }};
                assert.deepEqual(result, expected);
            });

            it('#Email invalido', async () => {
                const body = {
                    "email": "catanho333..",
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Email Invalido" }};
                assert.deepEqual(result, expected);
            });

            it('#Email não cadastrado', async () => {
                const body = {
                    "email": "zzzcatanho333@gmail.com",
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Usuário e/ou senha inválidos" }};
                assert.deepEqual(result, expected);
            });

            it('#Senha errada', async () => {
                const body = {
                    "email": "zzzcatanho333@gmail.com",
                    "senha": "123456",
                }
                const result = await axios.post(`${url}/signin`, body)
                    .catch((err) => { return err.response.data});
                const expected = { erro: { message:"Usuário e/ou senha inválidos" }};
                assert.deepEqual(result, expected);
            });

        });

    });
}