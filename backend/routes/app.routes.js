const { Router } = require('express');
const { homeGet, myprofileGet, newUser, welcomePost, profileGet, GetProfiles, GetImgProfile, PostComment, profileJsonGet, GetComment, PostFriendship, GetFriendsByEmail } = require('../controllers/app.controller');
const { upload, storage } = require('../middlewares/multer');

const router = Router();

router.get('/home', homeGet);
router.get('/myprofile', myprofileGet);
router.get('/welcome', newUser);
router.post('/welcome/:email', upload.single('image'), welcomePost);
router.get('/profile/:username', profileGet);
router.get('/users', GetProfiles);
router.get('/image/:email', GetImgProfile);
router.post('/comment', PostComment);
router.get('/comment/:email', GetComment);
router.get('/profile-data/:email', profileJsonGet);
router.post('/friendship/:email', PostFriendship);
router.get('/friends/:email', GetFriendsByEmail);




module.exports = router;