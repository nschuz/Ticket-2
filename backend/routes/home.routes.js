const { Router } = require('express');
const { loginGet, registerGet, anyrequest, registerPost, loginPost } = require('../controllers/home.controller');
const router = Router();

router.get('/login', loginGet);
router.post('/login', loginPost);
router.get('/register', registerGet);
router.post('/register', registerPost);
//router.get('*', anyrequest);

module.exports = router;