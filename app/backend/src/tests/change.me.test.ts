// import * as sinon from 'sinon';
// import * as chai from 'chai';
// import request from "supertest";
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import App from '../app';
// // import loginController from '../controller/loginController';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { app } = new App();

// const { expect } = chai;

// describe('Seu teste', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   // let chaiHttpResponse: Response;

//   // before(async () => {
//   //   sinon
//   //     .stub(Example, "findOne")
//   //     .resolves({
//   //       ...<Seu mock>
//   //     } as Example);
//   // });

//   // after(()=>{
//   //   (Example.findOne as sinon.SinonStub).restore();
//   // })

//   // it('...', async () => {
//   //   chaiHttpResponse = await chai
//   //      .request(app)
//   //      ...

//   //   expect(...)
//   // });

//   it('Seu sub-teste', async() => {
//     const login = {
//       email: 'teste@test.com',
//       password: '123456'
//     }

//     const result = await request(app).post("/login").send(login);

//     expect(result.statusCode).toEqual(401);
//     expect(result.body.message).toBeDefined();
//     expect(result.body.message).toEqual("Incorrect email or password");
//   });
// });
