const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "APICoder",
      version: "1.0.0",
      description: "API",
    },
  },
  apis: ["./docs/*.yaml"],
};

module.exports = swaggerOptions;
