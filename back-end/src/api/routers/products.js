const { Router } = require('express');

const controllers = require('../../database/controllers');
const middlewares = require('../../database/middlewares');

const router = Router();

router.get(
  '/',
  middlewares.authenticate,
  controllers.products.getAll,
  middlewares.error,
  );

module.exports = router;
