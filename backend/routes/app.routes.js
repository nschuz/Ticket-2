const { Router } = require('express');
const { homeGet, profileGet } = require('../controllers/app.controller');
const { anyrequest } = require('../controllers/home.controller');

const router = Router();

router.get('/home', homeGet);
router.get('/profile', profileGet);

//router.get('*', anyrequest);

module.exports = router;