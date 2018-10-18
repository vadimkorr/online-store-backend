const swaggerOptions = require('./swagger.json');
const expressSwaggerGen = require('express-swagger-generator');

module.exports = app => {
  const expressSwagger = expressSwaggerGen(app);
  expressSwagger(swaggerOptions);
};
