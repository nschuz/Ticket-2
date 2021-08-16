const { Router } = require('express');
const { homeGet, myprofileGet, newUser, welcomePost, profileGet, GetProfiles } = require('../controllers/app.controller');
const { anyrequest } = require('../controllers/home.controller');

const router = Router();

router.get('/home', homeGet);
router.get('/myprofile', myprofileGet);
router.get('/welcome', newUser);
router.post('/welcome/:email', welcomePost);
router.get('/profile/:username', profileGet);
router.get('/users', GetProfiles);

//router.get('*', anyrequest);

module.exports = router;