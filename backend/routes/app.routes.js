const { Router } = require('express');
const { homeGet, profileGet, newUser, welcomePost } = require('../controllers/app.controller');
const { anyrequest } = require('../controllers/home.controller');

const router = Router();

router.get('/home', homeGet);
router.get('/profile', profileGet);
router.get('/welcome', newUser);
router.post('/welcome/:email', welcomePost);

//router.get('*', anyrequest);

module.exports = router;