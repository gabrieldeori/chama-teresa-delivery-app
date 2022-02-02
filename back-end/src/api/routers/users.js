const { Router } = require('express');

const controllers = require('../../database/controllers');
const middlewares = require('../../database/middlewares');

const router = Router();

router.get(
  '/:role',
  middlewares.authenticate,
  controllers.users.getAllUsers,
  middlewares.error,
);

router.get(
  '/sellers/:id',
  middlewares.authenticate,
  controllers.users.getById,
  middlewares.error,
);

module.exports = router;
