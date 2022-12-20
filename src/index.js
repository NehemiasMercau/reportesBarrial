const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const { param } = require('./routes');
require('dotenv').config();

//Inicializations
const app = express();
require('./database');
require('./config/passport');

//Settings
console.log(process.env.PORT);

app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middlewares

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('_method')) //Sirve para que los formularios puedan enviar otros metodos, no solo Get y POST, sino PUT y DELETE
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); //Para que utilice la sesion declarada arriba
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/gestion'));
app.use(require('./routes/operativo'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server listen
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});