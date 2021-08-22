const { Router } = require('express');
const { homeGet, myprofileGet, newUser, welcomePost, profileGet, GetProfiles, GetImgProfile, PostComment, profileJsonGet, GetComment, PostFriendship, GetFriendsByEmail, GetChat, editProfileGet } = require('../controllers/app.controller');
const { upload, storage } = require('../middlewares/multer');
const { isNewUser } = require('../middlewares/newUser');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

router.get('/home', [validateJWT, isNewUser], homeGet);
router.get('/myprofile', [validateJWT, isNewUser], myprofileGet);
router.get('/welcome', [validateJWT], newUser);
router.post('/welcome/:email', [validateJWT, upload.single('image')], welcomePost);
router.get('/profile/:username', [validateJWT, isNewUser], profileGet);
router.get('/users', [validateJWT, isNewUser], GetProfiles);
router.get('/image/:email', [validateJWT, isNewUser], GetImgProfile);
router.post('/comment', [validateJWT, isNewUser], PostComment);
router.get('/comment/:email', [validateJWT, isNewUser], GetComment);
router.get('/profile-data/:email', [validateJWT, isNewUser], profileJsonGet);
router.post('/friendship/:email', [validateJWT, isNewUser], PostFriendship);
router.get('/friends/:email', [validateJWT, isNewUser], GetFriendsByEmail);
router.get('/chat', [validateJWT, isNewUser], GetChat)
router.get('/edit', [validateJWT, isNewUser], editProfileGet);




module.exports = router;