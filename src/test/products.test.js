const supertest = require("supertest");
const chai = require("chai");

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Products Router", () => {
  it("should get a list of products", async () => {
    const response = await request.get("/api/products");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("object");
  });

  it("should add a product", async () => {
    const adminUser = req.user;
    const productData = { title: "ProductTest" };

    const response = await request
      .post("/api/products")
      .send(productData)
      .set("Authorization", `Bearer ${adminUser}`);

    expect(response.status).to.equal(201);
  });
  it("should get a specific product by ID", async () => {
    const productId = "id_del_producto";
    const response = await request.get(`/api/products/${productId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("name");
  });

  it("should update a product", async () => {
    const productId = "id_del_producto";
    const updatedProductData = {};

    const response = await request
      .put(`/api/products/${productId}`)
      .send(updatedProductData)
      .set("Authorization", `Bearer ${token_del_usuario_admin}`);

    expect(response.status).to.equal(200);
  });

  it("should delete a product", async () => {
    const productId = "id_del_producto";

    const response = await request
      .delete(`/api/products/${productId}`)
      .set("Authorization", `Bearer ${token_del_usuario_admin}`);

    expect(response.status).to.equal(200);
  });
});
