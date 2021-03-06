const { Router } = require('express');
const axios = require('axios').default;
const { loginGet, registerGet, registerPost, loginPost, getAuth } = require('../controllers/home.controller');
const { checkLogin, checkRegister } = require('../middlewares/validationDTO');
const { upload } = require('../middlewares/multer');



const router = Router();
router.get('/login', loginGet);
router.post('/login', checkLogin, loginPost);
router.get('/register', registerGet);
router.post('/register', [checkRegister], registerPost);


/* Ruta de pruebas y posible features*/
router.get('/auth', getAuth);
router.get('/oauth-callback', function({ query: { code } }, res) {
    const body = {
        client_id: '0d2b7ff74ca4bce7ef38',
        client_secret: '2bdecb1b2300fe635daeec541cd732df14e7c83a',
        code,
    }
    const opts = { headers: { accept: 'application/json' } };

    axios
        .post('https://github.com/login/oauth/access_token', body, opts)
        .then((_res) => _res.data.access_token)
        .then((token) => {
            console.log(`My token ${token}`.green);
            const tokenHeader = {
                headers: {
                    "Authorization": token,
                    "X-OAuth-Scopes": "repo",
                }
            };

            res.redirect(`/app/welcome/?token=${token}`);

            // axios

            //     .get('https://api.github.com/user', body, tokenHeader)
            //     .then((response) => response.data)
            //     .then((data) => {
            //         console.log("DATA: ");
            //         console.log(data);
            //     })


        })
        .catch((err) => res.status(500).json(err))
})
router.get('/upload', (req, res) => {
    res.render('upload');
})
router.post('/upload', upload.single('image'), (req, res) => {
    res.send("Image Uploaded");
})


module.exports = router;