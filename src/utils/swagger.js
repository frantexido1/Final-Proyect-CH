const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APICoder",
      version: "1.1.0",
      description: "Ecommerce CoderHouse Francisco-Texido",
    },
  },
  apis: [
    "./src/docs/users/users.yaml",
    "./src/docs/products/products.yaml",
    "./src/docs/cart/cart.yaml",
    "./src/docs/sessions/sessions.yaml",
  ],
};

module.exports = swaggerOptions;
