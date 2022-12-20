const express = require('express');
const LdapManager = require('../auth/LdapManager');
const router = require('express').Router();
const passport = require('passport');

router.get('/users/login', (req, res) => {
    res.render('users/login', { layout: false });
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/users/login');
});

module.exports = router;