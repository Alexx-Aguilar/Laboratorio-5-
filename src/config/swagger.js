const swaggerJsdoc = require('swagger-jsdoc');

module.exports = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Lab 5: Notas + IA', version: '1.0.0' },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        NotaNueva: {
          type: 'object',
          required: ['titulo', 'contenido'],
          properties: {
            titulo: { type: 'string', minLength: 1, maxLength: 100, example: 'Mi nota' },
            contenido: { type: 'string', minLength: 1, maxLength: 5000, example: 'Contenido de ejemplo.' }
          }
        },
        Nota: {
          allOf: [
            { $ref: '#/components/schemas/NotaNueva' },
            {
              type: 'object',
              required: ['id'],
              properties: { id: { type: 'integer', example: 1 } }
            }
          ]
        },
        Pregunta: {
          type: 'object',
          required: ['pregunta'],
          properties: { pregunta: { type: 'string', minLength: 3, maxLength: 2000 } }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
});
