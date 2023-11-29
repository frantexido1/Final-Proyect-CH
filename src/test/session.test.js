const supertest = require("supertest");
const chai = require("chai");

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Sessions Router", () => {
  it("should login a user and return a JWT token", async () => {
    const userData = {
      email: "fram.texido@gmail.com",
      password: "fran1234",
    };

    const response = await request.post("/api/sessions/login").send(userData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });

  // Prueba para registrar un nuevo usuario
  it("should register a new user and return a JWT token", async () => {
    const userData = {
      email: "XXXXXXXXXXXXXXXXXXXXX",
      password: "XXXXXXXXXXXXXXXXXXXXX",
    };

    const response = await request
      .post("/api/sessions/register")
      .send(userData);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });

  // Prueba para enviar un correo electrónico
  it("should send an email address", async () => {
    const emailData = {
      email: "fran.texido@gmail.com",
    };

    const response = await request
      .post("/api/sessions/email-address")
      .send(emailData);

    expect(response.status).to.equal(200);
  });

  it("should recover the password using a token", async () => {
    const token = "token_de_recuperacion";
    const newPasswordData = {
      // Nueva contraseña
    };

    const response = await request
      .post(`/api/sessions/recovery-password/${token}`)
      .send(newPasswordData);

    expect(response.status).to.equal(200);
  });
});
