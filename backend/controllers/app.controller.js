const homeGet = (req, res) => {
    res.render('home');
}

const profileGet = (req, res) => {
    res.render('profile');
}


module.exports = {
    homeGet,
    profileGet,
}