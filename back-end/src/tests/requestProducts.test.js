const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = require('chai');

const { status } = require('../database/utils');

chai.use(chaiHTTP);

const app = require('../api/app');

let request;

describe('> Testando token de products', () => {
  before( async () => {
    try {
      request = await chai.request(app)
        .get('/products')
        .set({ authorization: });
    } catch (e) {
      console.log(e);
    }
  });

  it('Deve retornar status 200 de "OK"', async () => {
    expect(request.status).to.be.equals(status.OK);
  });

  it('Deve retornar estrutura correta de { success, message e data }', async () => {
    const { body: { success, message, data } } = request;
    expect(success).to.be.equals(true);
    expect(message).to.be.equals('Pong');
    expect(data).to.be.equals(null);
  });
});
