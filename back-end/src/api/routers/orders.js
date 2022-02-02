const { Router } = require('express');

const controllers = require('../../database/controllers');
const middlewares = require('../../database/middlewares');

const router = Router();

router.post(
  '/',
  middlewares.authenticate,
  controllers.orders.create,
  middlewares.error,
);

router.get(
  '/users',
  middlewares.authenticate,
  controllers.orders.getByUserId,
  middlewares.error,
);

router.get(
  '/:id',
  middlewares.authenticate,
  controllers.orders.getById,
  middlewares.error,
);

module.exports = router;
