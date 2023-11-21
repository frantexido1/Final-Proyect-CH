const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "APICoder",
      version: "1.0.0",
      description: "API",
    },
  },
  apis: [
    "./src/docs/users/users.yaml",
    "./src/docs/products/products.yaml",
    "./src/docs/cart/cart.yaml",
  ],
};

module.exports = swaggerOptions;
