const { Router } = require('express');

const controllers = require('../../database/controllers');
const middlewares = require('../../database/middlewares');

const router = Router();

router.get(
  '/',
  controllers.user.login,
  middlewares.error,
  );

module.exports = router;
