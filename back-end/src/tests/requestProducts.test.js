const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = require('chai');
const { stub } = require('sinon');

const models = require('../database/models');
const { status } = require('../database/utils');

chai.use(chaiHTTP);

const app = require('../api/app');

let request;

const newUser = {
  name: 'Nome Válido Teste',
  email: 'valid@mail.ok',
  password: 'e10adc3949ba59abbe56e057f20f883e',
  role: 'customer',
};

describe('> Testando request sem token', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .get('/products')
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 401 de "UNAUTHORIZED"', async () => {
    expect(request.status).to.be.equals(status.UNAUTHORIZED);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Token não encontrado');
    expect(data).to.be.equals(null);
  });
});

describe('> Testando request com token inválido', () => {
  before( async () => {
    const badToken = 'j10jf1028t13803j0'
    try {
      request = await chai.request(app)
        .get('/products')
        .set('authorization', badToken);
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 401 de "UNAUTHORIZED"', async () => {
    expect(request.status).to.be.equals(status.UNAUTHORIZED);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Token inválido ou expirado');
    expect(data).to.be.equals(null);
  });
});

describe('> Testando request retornando produtos', () => {
  before( async () => {
    insertedUser = await models.User.create(newUser);
    try {
      const token = await chai.request(app)
        .post('/login')
        .send({
          email: 'valid@mail.ok',
          password: '123456'
        })
        .then((res) => res.body.data.token);

      request = await chai.request(app)
        .get('/products')
        .set('authorization', token);
    } catch (e) {
      console.log(e);
    }
  });

  after(async () => {
    await insertedUser.destroy();
  })

  it('Deve retornar status 200 de "OK"', async () => {
    expect(request.status).to.be.equals(status.OK);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(true);
    expect(message).to.be.equals('Produtos Carregados');
    expect(data).not.equal(null);
    expect(data).to.be.a('array');
  });
});

describe('> Testando request que não retorna produtos', () => {
  let findAllStub;

  before( async () => {
    findAllStub = stub(models.Product, 'findAll');
    findAllStub.resolves([]);
    insertedUser = await models.User.create(newUser);
    try {
      const token = await chai.request(app)
        .post('/login')
        .send({
          email: 'valid@mail.ok',
          password: '123456'
        })
        .then((res) => res.body.data.token);

      request = await chai.request(app)
        .get('/products')
        .set('authorization', token);
    } catch (e) {
      console.log(e);
    }
  });

  after(async () => {
    await insertedUser.destroy();
    findAllStub.restore();
  })

  it('Deve retornar status 404 de "NOT FOUND"', async () => {
    expect(request.status).to.be.equals(status.NOT_FOUND);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Nenhum produto cadastrado');
    expect(data).to.be.equal(null);
  });
});

describe('> INTERNAL ERROR ao procurar no server', () => {
  let findAllStub;
  before( async () => {
    insertedUser = await models.User.create(newUser);
    error = new Error(">> FAKE findAll error <<");
    findAllStub = stub(models.Product, 'findAll').throws(error);
    try {
      const token = await chai.request(app)
        .post('/login')
        .send({
          email: 'valid@mail.ok',
          password: '123456'
        })
        .then((res) => res.body.data.token);

      request = await chai.request(app)
        .get('/products')
        .set('authorization', token);
    } catch (e) {
      console.log(e);
    }
  });

  after(async () => {
    await insertedUser.destroy();
    findAllStub.restore();
  })

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
