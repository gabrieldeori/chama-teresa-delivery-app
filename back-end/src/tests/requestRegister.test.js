const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = require('chai');
const { stub } = require('sinon');

const models = require('../database/models');
const { status } = require('../database/utils');

chai.use(chaiHTTP);

const app = require('../api/app');

let request;

describe('> Tentando registrar com nome inválido', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome',
          email: 'mail',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de "BAD REQUEST"', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Nome inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Tentando registrar com password inválido', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid@mail.ok',
          password: '12345',
        });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de "BAD REQUEST"', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Password inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Tentando registrar com email inválido', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'invalid',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de "BAD REQUEST"', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Email inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Registro bem sucedido', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid1@mail.ok',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 201 de "CREATED"', async () => {
    expect(request.status).to.be.equals(status.CREATED);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(true);
    expect(message).to.be.equals('Usuário cadastrado');
    expect(data).not.equals(null);
    expect(data.token).not.equals(null);
    expect(data.id).not.equals(null);
    expect(data.name).to.be.equals('Nome Válido Teste');
    expect(data.email).to.be.equals('valid1@mail.ok');
    expect(data.role).to.be.equals('customer');
  });
});

describe('> Não é possível cadastrar com email já existente no db', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid1@mail.ok',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 409 de "CONFLICT"', async () => {
    expect(request.status).to.be.equals(status.CONFLICT);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Usuário já existe');
    expect(data).to.be.equals(null);
  });
});

describe('> Erro no servidor', () => {
  let findAllStub;
  before( async () => {
    error = new Error("some fake error");
    findAllStub = stub(models.User, 'findAll').throws(error);
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid1@mail.ok',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  after( async () => {
    findAllStub.restore();
  });

  it('Deve retornar status 500 de "INTERNAL SERVER ERROR"', async () => {
    expect(request.status).to.be.equals(status.INTERNAL_SERVER_ERROR);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Erro interno do servidor');
    expect(data).to.be.equals(null);
  });
});

describe('> Erro ao procurar user no servidor', () => {
  let findAllStub;
  before( async () => {
    error = new Error(">> FAKE findAll error <<");
    findAllStub = stub(models.User, 'findAll').throws(error);
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid1@mail.ok',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  after( async () => {
    findAllStub.restore();
  });

  it('Deve retornar status 500 de "INTERNAL SERVER ERROR"', async () => {
    expect(request.status).to.be.equals(status.INTERNAL_SERVER_ERROR);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Erro interno do servidor');
    expect(data).to.be.equals(null);
  });
});

describe('> INTERNAL ERROR ao cadastrar user no servidor', () => {
  let createStub;
  before( async () => {
    error = new Error(">> FAKE create error <<");
    createStub = stub(models.User, 'create').throws(error);
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid4@mail.ok',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  after( async () => {
    createStub.restore();
  });

  it('Deve retornar status 500 de "INTERNAL SERVER ERROR"', async () => {
    expect(request.status).to.be.equals(status.INTERNAL_SERVER_ERROR);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Erro interno do servidor');
    expect(data).to.be.equals(null);
  });
});

describe('> No ID on create user', () => {
  let createStub;
  before( async () => {
    createStub = stub(models.User, 'create');
    createStub.resolves({});
    try {
      request = await chai.request(app)
        .post('/register')
        .send({
          name: 'Nome Válido Teste',
          email: 'valid4@mail.ok',
          password: '123456',
        });
    } catch (e) {
      console.log(e);
    }
  });

  after( async () => {
    createStub.restore();
  });

  it('Deve retornar status 500 de "INTERNAL SERVER ERROR"', async () => {
    expect(request.status).to.be.equals(status.INTERNAL_SERVER_ERROR);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Erro no banco de dados');
    expect(data).to.be.equals(null);
  });
});
