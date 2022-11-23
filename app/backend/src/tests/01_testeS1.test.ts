import * as sinon from 'sinon';
import * as chai from 'chai';
import * as request from "supertest";
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

type resultType = {
  statusCode: number
  body: {
    message: string
  }
}
describe('Seção 1: Users e Login', () => {

  it('testa server', async() => {
    type resultTypeget = {
      statusCode: number
      body: {
        ok: boolean
      }
    }

    const result = await request(app).get("/") as unknown as resultTypeget;

    expect(result.statusCode).equal(200);
    expect(result.body.ok).equal(true);
  });

  it('testa se email ou senha estao corretos', async() => {
    const login = {
      email: 'teste@test.com',
      password: '123456'
    }

    const result = await request(app).post("/login").send(login) as unknown as resultType;

    expect(result.statusCode).equal(401);
    expect(result.body.message).equal("Incorrect email or password");
  });

  it('testa tentar fazer login sem email', async() => {
    const loginSemEmail = {
      password: '123456'
    }

    const result = await request(app).post("/login").send(loginSemEmail) as unknown as resultType;

    expect(result.statusCode).equal(400);
    expect(result.body.message).equal("All fields must be filled");
  });

  it('testa tentar fazer login sem password', async() => {
    const loginSempaswd = {
      email: 'teste@teste.com'
    }

    const result = await request(app).post("/login").send(loginSempaswd) as unknown as resultType;

    expect(result.statusCode).equal(400);
    expect(result.body.message).equal("All fields must be filled");
  });

  it('testa tentar fazer login com password errado', async() => {
    const loginSempaswd = {
      email: 'admin@admin.com',
      password: '123456789'
    }

    const result = await request(app).post("/login").send(loginSempaswd) as unknown as resultType;

    expect(result.statusCode).equal(401);
    expect(result.body.message).equal("Incorrect email or password");
  });

  it('rota login validate token invalido', async() => {
    const head = {
      Authorization: 'jwqreiufbhuiqrbfpiwfuiqgi3pf'
    }

    const result = await request(app).get("/login/validate").set(head) as unknown as resultType;

    expect(result.statusCode).equal(401);
    expect(result.body.message).equal("Invalid token");
  });

  it('rota login validate sem token', async() => {
    const head = {
    }

    const result = await request(app).get("/login/validate").set(head) as unknown as resultType;

    expect(result.statusCode).equal(401);
    expect(result.body.message).equal("Token not found");
  });

});
