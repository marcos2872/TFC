import * as sinon from 'sinon';
import * as chai from 'chai';
import * as request from "supertest";
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import mockTeams from './mock/teamsMok';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

type resultType = {
  statusCode: number
  body: {
    message: string
  }
}
describe('Teste Login', () => {

  it('testa retorno de todos os times', async() => {

    const result = await request(app).get("/teams").expect(200, mockTeams)
  });

})