const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = require('chai');

const models = require('../database/models');
const { status } = require('../database/utils');

chai.use(chaiHTTP);

const app = require('../api/app');

let request;
let insertedUser;

const newUser = {
  name: 'Nome Válido Teste',
  email: 'valid@mail.ok',
  password: 'e10adc3949ba59abbe56e057f20f883e',
  role: 'customer',
};

// describe('> ', async () => { });
// it('', async () => {});

describe('> Requisição sem enviar body', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/login');
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de BAD REQUEST', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Email inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Requisição enviando apenas um email válido', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/login')
        .send({ email: 'valid@mail.com' });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de BAD REQUEST', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Password inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Email com @ no começo', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/login')
        .send({ email: '@failmail.com', password: '123456' });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de BAD REQUEST', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Email inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Email sem @', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/login')
        .send({ email: 'invalidmail.com', password: '123456' });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de BAD REQUEST', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Email inválido');
    expect(data).to.be.equals(null);
  })
});

describe('> Email sem "."', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .post('/login')
        .send({ email: 'fail@mailcom', password: '123456' });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 400 de BAD REQUEST', async () => {
    expect(request.status).to.be.equals(status.BAD_REQUEST);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Email inválido');
    expect(data).to.be.equals(null);
  });
});

describe('> Email e senha válidos mas email não existente.', () => {
  before( async () => {
    try {
      insertedUser = await models.User.create(newUser);
      request = await chai.request(app)
        .post('/login')
        .send({ email: 'nonexistent@email.com', password: '123456' });
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(async () => {
    await insertedUser.destroy();
  })

  it('Deve retornar status 404 de "NOT FOUND"', async () => {
    expect(request.status).to.be.equals(status.NOT_FOUND);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Usuário não existe');
    expect(data).to.be.equals(null);
  });
});

describe('> Email e senha válidos mas senha incorreta.', () => {
  before( async () => {
    try {
      insertedUser = await models.User.create(newUser);
      request = await chai.request(app)
        .post('/login')
        .send({ email: 'valid@mail.ok', password: 'erreiasenha' });
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(async () => {
    await insertedUser.destroy();
  })

  it('Deve retornar status 401 de UNAUTHORIZED', async () => {
    expect(request.status).to.be.equals(status.UNAUTHORIZED);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(false);
    expect(message).to.be.equals('Senha incorreta');
    expect(data).to.be.equals(null);
  });
});

describe('> Email e senha válidos e login bem sucedido.', () => {
  before( async () => {
    try {
      insertedUser = await models.User.create(newUser);
      request = await chai.request(app)
        .post('/login')
        .send({ email: 'valid@mail.ok', password: '123456' });
    } catch (e) {
      console.log(e);
    }
  });

  afterEach(async () => {
    await insertedUser.destroy();
  })

  it('Deve retornar status 200 de "OK"', async () => {
    expect(request.status).to.be.equals(status.OK);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(true);
    expect(message).to.be.equals('Sessão iniciada');
    expect(data.token).not.equal(null);
  });
});
