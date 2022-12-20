const Model = require('../helpers/ModelHelper');
const Util = require('../helpers/UtilHelper');
const Op = require('sequelize').Op;

const actividad = async(req, res) => {
    const Mapeo = Model.Mapeo;
    Model.TablaTipo.belongsTo(Mapeo, { foreignKey: 'TablaTipoId' });

    const usuarios = new Promise((resolve, reject) => {
        resolve(
            Model.Usuario.findAll({
                where: {
                    Activo: true,
                    PerfilId: 2 //Verificador
                },
                attributes: { exclude: ['empId'] }
            })
        )
    });

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
                    TablaTipoId: 1
                }
            })
        )
    })

    const mapeoConflictos = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 1
                }
            })
        )
    })

    const mapeoDemandas = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 1
                }
            })
        )
    })

    const mapeoPersonas = new Promise((resolve, reject) => {
        resolve(
            Model.Mapeo.findAll({
                where: {
                    Activo: true,
                    TablaTipoId: 1
                }
            })
        )
    })


    Promise.all(
        [usuarios, mapeoActuaciones, mapeoDelitos, mapeoConflictos, mapeoDemandas, mapeoPersonas]
    ).then((result) => {
        res.render('gestion/actividad', {
            cboUsuarios: result[0],
            columnasActuaciones: result[1],
            columnasDelitos: result[2],
            columnasConflictos: result[3],
            columnasDemandas: result[4],
            columnasPersonas: result[5],
            conResultados: false
        });
    })
}

const actividad_post = async(req, res) => {
    var { fechas, usuario } = req.body;
    let arrayFechas = fechas.split('-');
    let desde = arrayFechas[0].trim();
    let hasta = arrayFechas[1].trim();

    desde = Util.getFormatedDate(desde);
    hasta = Util.getFormatedDate(hasta);
    console.log(req.body)
    const Origen = Model.Origen;
    Origen.hasMany(Model.Actuacion, { foreignKey: 'OrigenId' });
    Model.Actuacion.belongsTo(Origen, { foreignKey: 'OrigenId' });

    const [dataConfirmados, dataAnulados, dataGenerados, dataRevisados, dataCorregir, cboUsuarios, oUsuario, mapeoActuaciones, mapeoDelitos, mapeoConflictos, mapeoDemandas, mapeoPersonas] = await Promise.all([
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 2,
                UsuarioIdCorreccion: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 3,
                UsuarioIdCorreccion: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 1,
                UsuarioIdCorreccion: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 4,
                UsuarioIdCorreccion: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 5,
                UsuarioIdCorreccion: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Usuario.findAll({
            where: {
                Activo: true,
                PerfilId: 2 //Verificador
            }
        }),
        Model.Usuario.findByPk(usuario),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 1
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 2
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 3
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 4
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 5
            }
        })
    ]).catch(error => {
        console.log(error);
    })

    console.log(oUsuario);
    var strFiltro = fechas.toString() + " - (" + oUsuario.Nombre + " " + oUsuario.Apellido + " " + oUsuario.UsuarioRed + ")";
    var esResultado = (dataConfirmados.length > 0 || dataAnulados.length > 0 || dataGenerados.length > 0 || dataRevisados.length > 0 || dataCorregir.length > 0);

    res.render('gestion/actividad', {
        confirmados: dataConfirmados,
        anulados: dataAnulados,
        generados: dataGenerados,
        revisar: dataRevisados,
        corregir: dataCorregir,
        cboUsuarios: cboUsuarios,
        oUsuario: oUsuario,
        filtro: strFiltro,
        columnasActuaciones: mapeoActuaciones,
        columnasDelitos: mapeoDelitos,
        columnasConflictos: mapeoConflictos,
        columnasDemandas: mapeoDemandas,
        columnasPersonas: mapeoPersonas,
        conResultados: esResultado,
        fechas: fechas,
        UsuarioId: oUsuario.UsuarioId,
        esBuscado: true
    });
}

const auditoria = async(req, res) => {

    const Mapeo = Model.Mapeo;
    Model.TablaTipo.belongsTo(Mapeo, { foreignKey: 'TablaTipoId' });
    const { Op } = require("sequelize");
    const [usuarios, mapeoActuaciones, mapeoDelitos, mapeoConflictos, mapeoDemandas, mapeoPersonas] = await Promise.all([
        Model.Usuario.findAll({
            where: {
                Activo: true,
                PerfilId: {
                    [Op.ne]: 2
                }
            },
            attributes: { exclude: ['empId'] }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 1
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 2
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 3
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 4
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 5
            }
        })
    ]).catch(error => {
        console.log(error);
    })

    res.render('gestion/auditoria', {
        cboUsuarios: usuarios,
        columnasActuaciones: mapeoActuaciones,
        columnasDelitos: mapeoDelitos,
        columnasConflictos: mapeoConflictos,
        columnasDemandas: mapeoDemandas,
        columnasPersonas: mapeoPersonas,
        conResultados: false
    });
}

const auditoria_post = async(req, res) => {
    var { fechas, usuario } = req.body;
    let arrayFechas = fechas.split('-');
    let desde = arrayFechas[0].trim();
    let hasta = arrayFechas[1].trim();
    desde = Util.getFormatedDate(desde);
    hasta = Util.getFormatedDate(hasta);
    console.log(req.body)
    const Origen = Model.Origen;
    Origen.hasMany(Model.Actuacion, { foreignKey: 'OrigenId' });
    Model.Actuacion.belongsTo(Origen, { foreignKey: 'OrigenId' });
    const { Op } = require("sequelize");

    const [dataConfirmados, dataAnulados, dataGenerados, dataRevisados, dataCorregir, cboUsuarios, oUsuario, mapeoActuaciones, mapeoDelitos, mapeoConflictos, mapeoDemandas, mapeoPersonas] = await Promise.all([
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 2,
                UsuarioId: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 3,
                UsuarioId: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 1,
                UsuarioId: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 4,
                UsuarioId: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Actuacion.findAll({
            where: {
                Activo: true,
                EstadoId: 5,
                UsuarioId: usuario,
                FechaAsentamiento: {
                    [Op.between]: [desde, hasta]
                }
            },
            include: {
                model: Origen
            }
        }),
        Model.Usuario.findAll({
            where: {
                Activo: true,
                PerfilId: {
                    [Op.ne]: 2
                }
            }
        }),
        Model.Usuario.findByPk(usuario),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 1
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 2
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 3
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 4
            }
        }),
        Model.Mapeo.findAll({
            where: {
                Activo: true,
                TablaTipoId: 5
            }
        })
    ]).catch(error => {
        console.log(error);
    })

    console.log(dataAnulados.length)

    var strFiltro = fechas.toString() + " - (" + oUsuario.Nombre + " " + oUsuario.Apellido + " " + oUsuario.UsuarioRed + ")";
    var esResultado = (dataConfirmados.length > 0 || dataAnulados.length > 0 || dataGenerados.length > 0 || dataRevisados.length > 0 || dataCorregir.length > 0);
    console.log(esResultado);
    res.render('gestion/auditoria', {
        confirmados: dataConfirmados,
        anulados: dataAnulados,
        generados: dataGenerados,
        revisar: dataRevisados,
        corregir: dataCorregir,
        cboUsuarios: cboUsuarios,
        oUsuario: oUsuario,
        filtro: strFiltro,
        columnasActuaciones: mapeoActuaciones,
        columnasDelitos: mapeoDelitos,
        columnasConflictos: mapeoConflictos,
        columnasDemandas: mapeoDemandas,
        columnasPersonas: mapeoPersonas,
        conResultados: esResultado,
        fechas: fechas,
        UsuarioId: oUsuario.UsuarioId,
        esBuscado: true
    });
}

module.exports = {
    actividad,
    actividad_post,
    auditoria,
    auditoria_post
}