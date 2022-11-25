import * as sinon from 'sinon';
import * as chai from 'chai';
import * as request from "supertest";
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;
import mock from './mock/leaderboardMock' 

describe('Seção 3: Partidas', () => {
  
  it('testa retorno de todos os times', async() => {

    await request(app).get("/leaderboard/home").expect(200, mock)
  });  
})