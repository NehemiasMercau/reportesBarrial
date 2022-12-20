const Sequelize = require('sequelize');
const sequelizeDB = require('../config/sequelize');
const Actuacion = require('../models/Actuacion')(sequelizeDB, Sequelize.DataTypes);
const Conflicto = require('../models/Conflicto')(sequelizeDB, Sequelize.DataTypes);
const CuadranteBarrial = require('../models/CuadranteBarrial')(sequelizeDB, Sequelize.DataTypes);
const DelitosPb = require('../models/DelitosPb')(sequelizeDB, Sequelize.DataTypes);
const Demanda = require('../models/Demanda')(sequelizeDB, Sequelize.DataTypes);
const Mapeo = require('../models/Mapeo')(sequelizeDB, Sequelize.DataTypes);
const Origen = require('../models/Origen')(sequelizeDB, Sequelize.DataTypes);
const OrigenTipo = require('../models/OrigenTipo')(sequelizeDB, Sequelize.DataTypes);
const Persona = require('../models/Persona')(sequelizeDB, Sequelize.DataTypes);
const TablaTipo = require('../models/TablaTipo')(sequelizeDB, Sequelize.DataTypes);
const Urgencia = require('../models/Urgencia')(sequelizeDB, Sequelize.DataTypes);
const LugarTipo = require('../models/LugarTipo')(sequelizeDB, Sequelize.DataTypes);
const Estado = require('../models/Estado')(sequelizeDB, Sequelize.DataTypes);
const EntrevistadoTipo = require('../models/EntrevistadoTipo')(sequelizeDB, Sequelize.DataTypes);
const CuadranteSector = require('../models/CuadranteSector')(sequelizeDB, Sequelize.DataTypes);
const Usuario = require('../models/Usuario')(sequelizeDB, Sequelize.DataTypes);
const Zona = require('../models/Zona')(sequelizeDB, Sequelize.DataTypes);
const Distrito = require('../models/Distrito')(sequelizeDB, Sequelize.DataTypes);
const ZonaDistrito = require('../models/ZonaDistrito')(sequelizeDB, Sequelize.DataTypes);
const ZonaDistritoCuadrante = require('../models/ZonaDistritoCuadrante')(sequelizeDB, Sequelize.DataTypes);



const model = {};

model[Actuacion.name] = Actuacion;
model[Conflicto.name] = Conflicto;
model[DelitosPb.name] = DelitosPb;
model[Usuario.name] = Usuario;
model[CuadranteBarrial.name] = CuadranteBarrial;
model[Origen.name] = Origen;
model[Mapeo.name] = Mapeo;
model[Persona.name] = Persona;
model[Demanda.name] = Demanda;
model[TablaTipo.name] = TablaTipo;
model[OrigenTipo.name] = OrigenTipo;
model[Urgencia.name] = Urgencia;
model[LugarTipo.name] = LugarTipo;
model[Estado.name] = Estado;
model[EntrevistadoTipo.name] = EntrevistadoTipo;
model[CuadranteSector.name] = CuadranteSector;
model[Zona.name] = Zona;
model[Distrito.name] = Distrito;
model[ZonaDistrito.name] = ZonaDistrito;
model[ZonaDistritoCuadrante.name] = ZonaDistritoCuadrante;

module.exports = model;