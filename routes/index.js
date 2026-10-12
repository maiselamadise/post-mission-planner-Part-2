const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', require('./auth'));
router.use('/spiritual-goals', require('./spiritualGoals'));
router.use('/career-goals', require('./careerGoals'));

module.exports = router;
