const supertest = require("supertest");
const chai = require("chai");

const expect = chai.expect;
const request = supertest("http://localhost:8080");

describe("Carts Router", () => {
  it("should get a list of carts", async () => {
    const response = await request.get("/api/carts");
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  it("should get a specific cart by ID", async () => {
    const cartId = "id_del_carrito";
    const response = await request.get(`/api/carts/${cartId}`);
    expect(response.status).to.equal(200);
  });

  it("should create a new cart", async () => {
    const response = await request.post("/api/carts");
    expect(response.status).to.equal(200);
  });

  // Prueba para eliminar un carrito
  it("should delete a cart", async () => {
    const cartId = "id_del_carrito";
    const response = await request.delete(`/api/carts/${cartId}`);
    expect(response.status).to.equal(200);
  });

  // Prueba para agregar un producto a un carrito
  it("should add a product to a cart", async () => {
    const cartId = "id_del_carrito";
    const productId = "id_del_producto";
    const response = await request.put(`/api/carts/${cartId}/${productId}`);
    expect(response.status).to.equal(200);
  });

  // Prueba para eliminar un producto de un carrito
  it("should delete a product from a cart", async () => {
    const cartId = "id_del_carrito";
    const productId = "id_del_producto";
    const response = await request.delete(
      `/api/carts/${cartId}/products/${productId}`
    );
    expect(response.status).to.equal(200);
  });

  it("should delete all products from a cart", async () => {
    const cartId = "id_del_carrito";
    const response = await request.delete(`/api/carts/${cartId}/products`);
    expect(response.status).to.equal(200);
  });

  it("should purchase a cart", async () => {
    const cartId = "id_del_carrito";
    const response = await request.post(`/api/carts/${cartId}/purchase`);
    expect(response.status).to.equal(200);
  });
});
