const Model = require('../helpers/ModelHelper');
const Sequelize = require('sequelize');


// Override timezone formatting for MSSQL
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
    return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
};

function _isInteger(val) {
    var digits = "1234567890";
    for (var i = 0; i < val.length; i++) {
        if (digits.indexOf(val.charAt(i)) == -1) { return false; }
    }
    return true;
}

function getFormatedDate(dateString) {
    dateString = dateString.substr(6, 4) + "-" + dateString.substr(3, 2) + "-" + dateString.substr(0, 2);
    var date = new Date(dateString);
    return date;
}

function getArrayAttributes(multipleSelec) {
    var relaciones = [];
    if (multipleSelec.includes('OrigenId')) {
        const Origen = Model.Origen;
        Model.Actuacion.belongsTo(Origen, { foreignKey: 'OrigenId' });
        relaciones.push({
            model: Origen,
            required: true,
            as: 'Origen',
            attributes: ['Nombre']
        });
        var i = multipleSelec.indexOf('OrigenId');
        multipleSelec[i] = [Sequelize.literal('Origen.Nombre'), 'ORIGEN'];
    }
    if (multipleSelec.includes('OrigenTipoId')) {
        const OrigenTipo = Model.OrigenTipo;
        Model.Actuacion.belongsTo(OrigenTipo, { foreignKey: 'OrigenTipoId' });
        relaciones.push({
            model: OrigenTipo,
            as: 'OrigenTipo',
            attributes: ['Nombre']
        });
        var i = multipleSelec.indexOf('OrigenTipoId');
        multipleSelec[i] = [Sequelize.literal('OrigenTipo.Nombre'), 'Tipo Origen'];
    }
    if (multipleSelec.includes('UrgenciaId')) {
        const Urgencia = Model.Urgencia;
        Model.Actuacion.belongsTo(Urgencia, { foreignKey: 'UrgenciaId' });
        relaciones.push({
            model: Urgencia,
            attributes: ['Nombre']
        });
        var i = multipleSelec.indexOf('UrgenciaId');
        multipleSelec[i] = [Sequelize.literal('Urgencia.Nombre'), 'URGENCIA']
    }
    if (multipleSelec.includes('LugarTipoId')) {
        const LugarTipo = Model.LugarTipo;
        Model.Actuacion.belongsTo(LugarTipo, { foreignKey: 'LugarTipoId' });
        relaciones.push({
            model: LugarTipo
        });
        var i = multipleSelec.indexOf('LugarTipoId');
        multipleSelec[i] = [Sequelize.literal('LugarTipo.Nombre'), 'Tipo Lugar']
    }
    if (multipleSelec.includes('UsuarioId')) {
        const Usuario = Model.Usuario;
        Model.Actuacion.belongsTo(Usuario, { foreignKey: 'UsuarioId' });
        relaciones.push({
            model: Usuario,
            required: true,
            attributes: ['Nombre', 'Apellido']
        });
        var i = multipleSelec.indexOf('UsuarioId');
        var str = [Sequelize.literal('Usuario.Nombre + Usuario.Apellido'), 'USUARIO'];
        multipleSelec[i] = str;
        console.log(multipleSelec);
    }
    if (multipleSelec.includes('CuadranteBarrialId')) {
        const CuadranteBarrial = Model.CuadranteBarrial;
        Model.Actuacion.belongsTo(CuadranteBarrial, { foreignKey: 'CuadranteBarrialId' });
        relaciones.push({
            model: CuadranteBarrial
        });
        var i = multipleSelec.indexOf('CuadranteBarrialId');
        multipleSelec[i] = [Sequelize.literal('CuadranteBarrial.Nombre'), 'CUADRANTE'];
    }
    if (multipleSelec.includes('EstadoId')) {
        const Estado = Model.Estado;
        Model.Actuacion.belongsTo(Estado, { foreignKey: 'EstadoId' });
        relaciones.push({
            model: Estado,
            required: true
        });
        var i = multipleSelec.indexOf('EstadoId');
        multipleSelec[i] = [Sequelize.literal('Estado.Nombre'), 'ESTADO'];
    }
    if (multipleSelec.includes('EntrevistadoTipoId')) {
        const EntrevistadoTipo = Model.EntrevistadoTipo;
        Model.Actuacion.belongsTo(EntrevistadoTipo, { foreignKey: 'EntrevistadoTipoId' });
        relaciones.push({
            model: EntrevistadoTipo
        });
        var i = multipleSelec.indexOf('EntrevistadoTipoId');
        multipleSelec[i] = [Sequelize.literal('EntrevistadoTipo.Nombre'), 'Tipo Entrevistado'];
    }
    if (multipleSelec.includes('CuadranteSectorId')) {
        const CuadranteSector = Model.CuadranteSector;
        Model.Actuacion.belongsTo(CuadranteSector, { foreignKey: 'CuadranteSectorId' });
        relaciones.push({
            model: CuadranteSector
        });
        var i = multipleSelec.indexOf('CuadranteSectorId');
        multipleSelec[i] = [Sequelize.literal('CuadranteSector.Nombre'), 'SECTOR'];
    }

    var result = [relaciones, multipleSelec];
    return result;
}

module.exports = {
    _isInteger,
    getFormatedDate,
    getArrayAttributes
}