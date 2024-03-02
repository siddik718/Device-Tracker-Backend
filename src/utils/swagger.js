
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const { version } = require("../../package.json");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API Docs",
      version
    },
  },
  apis: ["../routes/company.js"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDoc(app,port) {
    // Swagger Page.
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs In JSON format.
    app.get("docs.json",(req,res) => {
        res.setHeader("Content-Type","application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs Available at http://localhost:${port}/api-docs`);
}

module.exports = swaggerDoc;