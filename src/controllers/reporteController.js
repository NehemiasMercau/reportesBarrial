const Model = require('../helpers/ModelHelper');
const Util = require('../helpers/UtilHelper');
const Op = require('sequelize').Op;
const request = require('request');

const gestion_actividad = async(req, res) => {
    const { fechas, UsuarioId, multipleSelec } = req.body;
    const errors = [];
    let arrayFechas = fechas.split('-');
    let desde = arrayFechas[0].trim();
    let hasta = arrayFechas[1].trim();

    console.log(req.body);
    desde = Util.getFormatedDate(desde);
    hasta = Util.getFormatedDate(hasta);

    var resultArrays = Util.getArrayAttributes(multipleSelec);
    var relationships = resultArrays[0];
    var columns = resultArrays[1];
    console.log(resultArrays);

    const [dataActuacion] = await Promise.all([
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                UsuarioIdCorreccion: UsuarioId,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: relationships,
            attributes: columns
        })
    ]).catch(error => {
        console.log(error);
    })

    /*  try { */
    var data = {
        //template: { 'shortid': process.env.SHORTID_ACTUACIONES },
        template: { 'shortid': process.env.SHORTID_ACTUACIONES },
        options: {
            preview: true
        },
        data: {
            "actuaciones": dataActuacion
        }
    }
    var options = {
        uri: process.env.JSREPORT_URL,
        method: 'POST',
        json: data
    }
    request(options, async function(error, response, body) {
        if (error) {
            const usuarios = await Promise.all([
                Model.Usuario.findAll({
                    where: {
                        Activo: true
                    },
                    attributes: { exclude: ['empId'] }
                })
            ])
            console.error("httpRequests : error " + error);
            console.error(usuarios);
            res.render('gestion/actividad', {
                cboUsuarios: usuarios,
                conResultados: false,
                errors
            });
        }
    }).pipe(res);
}

const gestion_auditoria = async(req, res) => {
    const { fechas, UsuarioId, multipleSelec } = req.body;
    const errors = [];
    let arrayFechas = fechas.split('-');
    let desde = arrayFechas[0].trim();
    let hasta = arrayFechas[1].trim();

    console.log(req.body);
    desde = Util.getFormatedDate(desde);
    hasta = Util.getFormatedDate(hasta);

    var resultArrays = Util.getArrayAttributes(multipleSelec);
    var relationships = resultArrays[0];
    var columns = resultArrays[1];
    console.log(resultArrays);

    const [dataActuacion] = await Promise.all([
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                UsuarioId: UsuarioId,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: relationships,
            attributes: columns
        })
    ]).catch(error => {
        console.log(error);
    })

    var data = {
        template: { 'shortid': process.env.SHORTID_ACTUACIONES },
        options: {
            preview: true
        },
        data: {
            "actuaciones": dataActuacion
        }
    }
    var options = {
        uri: process.env.JSREPORT_URL,
        method: 'POST',
        json: data
    }
    request(options, async function(error, response, body) {
        if (error) {
            const usuarios = await Promise.all([
                Model.Usuario.findAll({
                    where: {
                        Activo: true
                    },
                    attributes: { exclude: ['empId'] }
                })
            ])
            console.error("httpRequests : error " + error);
            console.error(usuarios);
            res.render('gestion/actividad', {
                cboUsuarios: usuarios,
                conResultados: false,
                errors
            });
        }
    }).pipe(res);
}

const operativo_actividad = async(req, res) => {
    var { zona, distrito, cuadrante, fechas, multipleSelec } = req.body;
    const errors = [];

    let arrayFechas = fechas.split('-');
    let desde = arrayFechas[0].trim();
    let hasta = arrayFechas[1].trim();

    desde = Util.getFormatedDate(desde);
    hasta = Util.getFormatedDate(hasta);

    var resultArrays = Util.getArrayAttributes(multipleSelec);
    var relationships = resultArrays[0];
    var columns = resultArrays[1];
    console.log(resultArrays);


    const listCuadrantes = await new Promise((resolve, reject) => {
        if (zona != '') {
            console.log('entra por zona')
            resolve(
                Model.ZonaDistrito.findAll({
                    where: {
                        Activo: true,
                        ZonaId: zona
                    }
                }).then((result) => {
                    let arrayDistritos = [];
                    for (var i = 0; i < result.length; i++) {
                        arrayDistritos.push(result[i].dataValues.DistritoId);
                    }
                    return arrayDistritos;
                }).then((resultZonaDistrito) => {
                    return Model.ZonaDistritoCuadrante.findAll({
                        where: {
                            Activo: true,
                            ZonaDistritoId: resultZonaDistrito
                        }
                    })
                })
            )
        } else if (distrito != '') {
            console.log('entra por distrito')
            resolve(
                Model.ZonaDistrito.findAll({
                    where: {
                        Activo: true,
                        DistritoId: distrito
                    }
                }).then((result) => {
                    let arrayDistritos = [];
                    for (var i = 0; i < result.length; i++) {
                        arrayDistritos.push(result[i].DistritoId);
                    }
                    return arrayDistritos;
                }).then((resultZonaDistrito) => {
                    return Model.ZonaDistritoCuadrante.findAll({
                        where: {
                            Activo: true,
                            ZonaDistritoId: resultZonaDistrito
                        }
                    })
                })
            )
        } else {
            console.log('entra por cuadrante')
            resolve(
                Model.CuadranteBarrial.findAll({
                    where: {
                        Activo: true,
                        CuadranteBarrialId: cuadrante
                    }
                }).then((result) => {
                    let arrayCuadrantesSimple = [];
                    for (var i = 0; i < result.length; i++) {
                        arrayCuadrantesSimple.push(result[i].CuadranteBarrialId);
                    }
                    return arrayCuadrantesSimple;
                })
            )
        }

    })

    let arrayCuadrantes = [];
    console.log(listCuadrantes);
    if (listCuadrantes != undefined) {
        for (var i = 0; i < listCuadrantes.length; i++) {
            arrayCuadrantes.push(listCuadrantes[i].CuadranteBarrialId);
        }
    }

    const [dataActuacion] = await Promise.all([
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                CuadranteBarrialId: arrayCuadrantes,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: relationships,
            attributes: columns
        })
    ]).catch(error => {
        console.log(error);
    })

    /*  try { */
    var data = {
        template: { 'shortid': process.env.SHORTID_ACTUACIONES },
        options: {
            preview: true
        },
        data: {
            "actuaciones": dataActuacion
        }
    }
    var options = {
        uri: process.env.JSREPORT_URL,
        method: 'POST',
        json: data
    }
    request(options, async function(error, response, body) {
        if (error) {
            const usuarios = await Promise.all([
                Model.Usuario.findAll({
                    where: {
                        Activo: true
                    },
                    attributes: { exclude: ['empId'] }
                })
            ])
            console.error("httpRequests : error " + error);
            console.error(usuarios);
            res.render('operativo/actividad', {
                conResultados: false,
                errors
            });
        }
    }).pipe(res);
}

module.exports = {
    gestion_actividad,
    gestion_auditoria,
    operativo_actividad
}