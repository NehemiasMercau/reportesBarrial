const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Model = require('../helpers/ModelHelper');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true
}, async(req, username, password, done) => {
    await Model.Usuario.findOne({
        where: {
            UsuarioRed: username,
            Activo: true,
            Reportes: true
        }

    }).then((result) => {
        console.log(result);
        if (!result) {
            return done(null, false, { message: 'Not User found.' });
        } else {
            return done(null, result);
        }
    }).catch((err) => {
        console.log(err);
    });

}));


//Toma un usuario y un callback. Almacena en una sesion el id del usuario.
passport.serializeUser((user, done) => {
    done(null, user.dataValues.UsuarioId);
});

//Proceso inverso. Toma un id y un callback. Busca en la DB un usuario con ese id.
passport.deserializeUser(async(id, done) => {
    await Model.Usuario.findOne({
        where: {
            UsuarioId: id,
            Activo: true
        }
    }).then((user) => {
        done(null, user);
    }).catch((err) => {
        done(err, user);
    });


});