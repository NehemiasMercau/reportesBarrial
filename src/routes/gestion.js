const router = require('express').Router();
const { isAuthenticated } = require('../helpers/auth');
const Handlebars = require('handlebars');
const gestionController = require('../controllers/gestionController');
const reporteController = require('../controllers/reporteController');

Handlebars.registerHelper('isEqual', function(expectedValue, value) {
    console.log(expectedValue);
    console.log(value);
    return value === expectedValue;
});

router.get('/gestion', isAuthenticated, (req, res) => {
    res.render('gestion/index');
})

router.get('/gestion/actividad', isAuthenticated, gestionController.actividad)

router.post('/gestion/actividad', isAuthenticated, gestionController.actividad_post)

router.post('/gestion/actividad/reporte', isAuthenticated, reporteController.gestion_actividad)

router.get('/gestion/auditoria', isAuthenticated, gestionController.auditoria)

router.post('/gestion/auditoria', isAuthenticated, gestionController.auditoria_post)

router.post('/gestion/auditoria/reporte', isAuthenticated, reporteController.gestion_auditoria)

module.exports = router;