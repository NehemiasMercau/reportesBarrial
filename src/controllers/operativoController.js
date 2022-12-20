const Model = require('../helpers/ModelHelper');
const Util = require('../helpers/UtilHelper');
const Op = require('sequelize').Op;


const actividad = async(req, res) => {
    const [listZona, listDistrito, listCuadrante] = await Promise.all([
        Model.Zona.findAll({
            where: {
                Activo: true
            }
        }),
        Model.Distrito.findAll({
            where: {
                Activo: true
            }
        }),
        Model.CuadranteBarrial.findAll({
            where: {
                Activo: true
            }
        })
    ])

    res.render('operativo/actividad', {
        cboZona: listZona,
        cboDistrito: listDistrito,
        cboCuadrante: listCuadrante
    });
}

const actividad_post = async(req, res) => {
    var { zona, distrito, cuadrante, fechas } = req.body;
    console.log(req.body);
    let arrayFechas = fechas.split('-');
    let desde = arrayFechas[0].trim();
    let hasta = arrayFechas[1].trim();
    //var usuario = 32; //cambiar!!!
    desde = Util.getFormatedDate(desde);
    hasta = Util.getFormatedDate(hasta);
    console.log(req.body);
    const Origen = Model.Origen;
    Origen.hasMany(Model.Actuacion, { foreignKey: 'OrigenId' });
    Model.Actuacion.belongsTo(Origen, { foreignKey: 'OrigenId' });

    const listZona = new Promise((resolve, reject) => {
        resolve(
            Model.Zona.findAll({
                where: {
                    Activo: true
                }
            }))
    })

    const listDistrito = new Promise((resolve, reject) => {
        resolve(
            Model.Distrito.findAll({
                where: {
                    Activo: true
                }
            }))
    })

    const listCuadrante = new Promise((resolve, reject) => {
        resolve(
            Model.CuadranteBarrial.findAll({
                where: {
                    Activo: true
                }
            }))
    })

    const listCuadrantes = await new Promise((resolve, reject) => {
        if (zona != '') {
            console.log('entra por zona');
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
            console.log('entra por distrito');
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
            console.log('entra por cuadrante');
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
    if (listCuadrantes != undefined) {
        for (var i = 0; i < listCuadrantes.length; i++) {
            arrayCuadrantes.push(listCuadrantes[i].CuadranteBarrialId);
        }
    }
    console.log(arrayCuadrantes);

    const resultConfirmados = await new Promise((resolve, reject) => {
        resolve(
            Model.Actuacion.findAll({
                where: {
                    Activo: true,
                    CuadranteBarrialId: arrayCuadrantes,
                    EstadoId: 2,
                    FechaAsentamiento: {
                        [Op.between]: [desde, hasta]
                    }
                },
                include: {
                    model: Origen
                }
            })
            .catch((errror) => {
                console.log(errror);
            })
        )
    })

    const resultGenerados = await new Promise((resolve, reject) => {
        resolve(
            Model.Actuacion.findAll({
                where: {
                    Activo: true,
                    CuadranteBarrialId: arrayCuadrantes,
                    EstadoId: 1,
                    FechaAsentamiento: {
                        [Op.between]: [desde, hasta]
                    }
                },
                include: {
                    model: Origen
                }
            })
            .catch((errror) => {
                console.log(errror);
            })
        )

    })

    const resultAnulado = await new Promise((resolve, reject) => {
        resolve(
            Model.Actuacion.findAll({
                where: {
                    Activo: true,
                    CuadranteBarrialId: arrayCuadrantes,
                    EstadoId: 3,
                    FechaAsentamiento: {
                        [Op.between]: [desde, hasta]
                    }
                },
                include: {
                    model: Origen
                }
            })
            .catch((errror) => {
                console.log(errror);
            })
        )

    })

    const resultRevisado = await new Promise((resolve, reject) => {
        resolve(
            Model.Actuacion.findAll({
                where: {
                    Activo: true,
                    CuadranteBarrialId: arrayCuadrantes,
                    EstadoId: 4,
                    FechaAsentamiento: {
                        [Op.between]: [desde, hasta]
                    }
                },
                include: {
                    model: Origen
                }
            })
            .catch((errror) => {
                console.log(errror);
            })
        )

    })

    const resultACorregir = await new Promise((resolve, reject) => {
        resolve(
            Model.Actuacion.findAll({
                where: {
                    Activo: true,
                    CuadranteBarrialId: arrayCuadrantes,
                    EstadoId: 5,
                    FechaAsentamiento: {
                        [Op.between]: [desde, hasta]
                    }
                },
                include: {
                    model: Origen
                }
            })
            .catch((errror) => {
                console.log(errror);
            })
        )
    })

    const nameObj = new Promise((resolve, reject) => {
        if (zona != '') {
            resolve(
                Model.Zona.findAll({
                    where: {
                        ZonaId: zona
                    }
                })
            )
        } else if (distrito != '') {
            resolve(
                Model.Distrito.findAll({
                    where: {
                        DistritoId: distrito
                    }
                })
            )
        } else if (cuadrante != '') {
            resolve(
                Model.CuadranteBarrial.findAll({
                    where: {
                        CuadranteBarrialId: cuadrante
                    }
                })
            )
        }

    })

    const mapeoActuaciones = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 1
                }
            })
        )
    })

    const mapeoDelitos = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 2
                }
            })
        )
    })

    const mapeoConflictos = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 3
                }
            })
        )
    })

    const mapeoDemandas = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 4
                }
            })
        )
    })

    const mapeoPersonas = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 5
                }
            })
        )
    })
    await Promise.all(
        [
            listZona, //0
            listDistrito, //1
            listCuadrante, //2
            resultConfirmados, //3
            resultGenerados, //4
            resultAnulado, //5
            resultRevisado, //6
            resultACorregir, //7
            mapeoActuaciones, //8
            mapeoDelitos, //9
            mapeoConflictos, //10
            mapeoDemandas, //11
            mapeoPersonas, //12
            nameObj //13
        ]
    ).then((result) => {
        var strOpcion = result[13][0].Nombre;
        var strFiltro = fechas.toString() + " - " + strOpcion;
        var esResultado = (result[3].length > 0 || result[4].length > 0 || result[5].length > 0 || result[6].length > 0 || result[7].length > 0);

        res.render('operativo/actividad', {
            cboZona: result[0],
            cboDistrito: result[1],
            cboCuadrante: result[2],
            tableConfirmados: result[3],
            tableGenerados: result[4],
            tableAnulado: result[5],
            tableRevisado: result[6],
            tableACorregir: result[7],
            columnasActuaciones: result[8],
            columnasDelitos: result[9],
            columnasConflictos: result[10],
            columnasDemandas: result[11],
            columnasPersonas: result[12],
            ConResultados: esResultado,
            filtro: strFiltro,
            esBuscado: true,
            fechas: fechas,
            zona: zona,
            distrito: distrito,
            cuadrante: cuadrante
        });
    })
}
module.exports = {
    actividad,
    actividad_post
}