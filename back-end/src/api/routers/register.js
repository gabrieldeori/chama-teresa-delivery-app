const { Router } = require('express');

const controllers = require('../../database/controllers');
const middlewares = require('../../database/middlewares');

const router = Router();

router.post(
  '/',
  middlewares.validate.register,
  controllers.users.register,
  middlewares.error,
  );

module.exports = router;
