const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');

router.get('/', isAuthenticated, (req, res) => {
    res.render('index');
})
module.exports = router;