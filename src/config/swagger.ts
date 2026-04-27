import swaggerJsdoc from "swagger-jsdoc";

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Teams Tasks API",
      version: "1.0.0",
      description: "API documentation for Teams Tasks Backend",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/modules/**/*.ts", "./src/controllers/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
