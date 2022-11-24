import * as sinon from 'sinon';
import * as chai from 'chai';
import * as request from "supertest";
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';
import { getAll } from '../services/matchesServices';
import generateToken from '../utils/generateToken';
// import mockMatchess from './mock/matchesMockes';

chai.use(chaiHttp);
const { app } = new App();
const { expect } = chai;

describe('Seção 3: Partidas', () => {

  
  it('testa retorno de todos os times', async() => {
    const mockMatchess = await getAll()

    await request(app).get("/matches").expect(200, mockMatchess)
  });

  it('testa filtro inProgress true', async() => {
    const mockMatchess = await getAll()
    const filter = mockMatchess.filter(({inProgress}) => inProgress === true)
    await request(app).get("/matches?inProgress=true").expect(200, filter)
  });

  it('testa filtro inProgress false', async() => {
    const mockMatchess = await getAll()
    const filter = mockMatchess.filter(({inProgress}) => inProgress === false)
    await request(app).get("/matches?inProgress=false").expect(200, filter)
  });

  it('testa cadastrar matches', async() => {
    const mockMatchess = await getAll()
    const token = generateToken(1)

    const head = {
      Authorization: token
    }

    const params = {
      homeTeam: 16,
      awayTeam: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }

    const resp = {
      id: mockMatchess.length + 1,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 8,
      awayTeamGoals: 2,
      inProgress: true,
    }

     await request(app).post("/matches").set(head).send(params).expect(201, resp)
  });

  it(' alterar o status inProgress de uma partida para false', async() => {
    await request(app).patch("/matches/3/finish").expect(200, { "message": "Finished" })
  });

  it('testa cadastrar matches sem token', async() => {
    const head = {
      Authorization: 'ewfewfwqfwefwefwefwefrfg4g2'
    }

    const params = {
      homeTeam: 16,
      awayTeam: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }
    await request(app).post("/matches").set(head).send(params).expect(401, { "message": "Token must be a valid token" })
  });

  it('testa cadastrar con id iguais', async() => {
    const token = generateToken(1)

    const head = {
      Authorization: token
    }

    const params = {
      homeTeam: 16,
      awayTeam: 16, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }
    await request(app).post("/matches").set(head).send(params).expect(422, { "message": "It is not possible to create a match with two equal teams" })
  });

  it('testa cadastrar matches id não existe', async() => {
    const token = generateToken(1)

    const head = {
      Authorization: token
    }

    const params = {
      homeTeam: 342,
      awayTeam: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    }
    await request(app).post("/matches").set(head).send(params).expect(404, { "message": "There is no team with such id!" })
  });

  it('atualizar partidas em andamento', async() => {
    const token = generateToken(1)

    const head = {
      Authorization: token
    }

    const params = {
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
    }

    await request(app).patch("/matches/2").set(head).send(params).expect(200, { "message": "success" })
  });
  
})