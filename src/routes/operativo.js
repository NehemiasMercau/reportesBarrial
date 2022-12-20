const { route } = require('.');
const router = require('express').Router();
const request = require('request');
const Sequelize = require('sequelize');
const Op = require('sequelize').Op;
const Model = require('../helpers/ModelHelper');
const moment = require('moment');
const { json, col } = require('sequelize');
const { isAuthenticated } = require('../helpers/auth');
const Handlebars = require('handlebars');
const ZonaDistrito = require('../models/ZonaDistrito');
const operativoController = require('../controllers/operativoController');
const reporteController = require('../controllers/reporteController');


router.get('/operativo', (req, res) => {
    res.render('operativo/index');
})

router.get('/operativo/actividad', isAuthenticated, operativoController.actividad);


router.post('/operativo/actividad', isAuthenticated, operativoController.actividad_post);


router.post('/operativo/actividad/reporte', isAuthenticated, reporteController.operativo_actividad);


module.exports = router;