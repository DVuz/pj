const { Router } = require('express');
const { login } = require('../controller/auth/login');
const { logout } = require('../controller/auth/logout');
const { refresh } = require('../controller/auth/refresh');
const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refresh);

module.exports = router;
