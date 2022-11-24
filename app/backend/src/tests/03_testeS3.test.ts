import * as sinon from 'sinon';
import * as chai from 'chai';
import * as request from "supertest";
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import { getAll } from '../services/matchesServices';
// import mockMatchess from './mock/matchesMockes';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

type resultType = {
  statusCode: number
  body: {
    message: string
  }
}
describe('Seção 3: Partidas', async() => {

  const mockMatchess = await getAll()

  it('testa retorno de todos os times', async() => {

    await request(app).get("/matches").expect(200, mockMatchess)
  });

  it('testa filtro inProgress true', async() => {
    const filter = mockMatchess.filter(({inProgress}) => inProgress === true)
    await request(app).get("/matches?inProgress=true").expect(200, filter)
  });

  it('testa filtro inProgress false', async() => {
    const filter = mockMatchess.filter(({inProgress}) => inProgress === false)
    await request(app).get("/matches?inProgress=false").expect(200, filter)
  });
})