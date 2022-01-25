const { Router } = require('express');

const controllers = require('../../database/controllers');

const router = Router();

router.get(
  '/',
  controllers.ping,
  );

module.exports = router;
