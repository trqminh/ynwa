const express = require('express');
const app = express();
app.use(express.static(__dirname));
const path = require('path');

// setup view engine
var exphbs = require('express-handlebars');
var paginateHelper = require('./assets/js/paginate');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
    defaultLayout: 'manage',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
        ifEqual: function(arg1, arg2, options){
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        ifMoreThan: function(arg1, arg2, options){
            return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
        },
        paginate: paginateHelper.createPagination
      }
}));
app.set('view engine', 'handlebars');

// Create database
var models = require('./models');
app.get('/sync', function(req, res){
	models.sequelize.sync({force: true}).then(function(){
		res.send('database sync completed!');
	});
});

//session
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
app.use(expressValidator());
var session = require('express-session');

app.use(cookieParser());

app.use(session({
    cookie: {httpOnly: true, maxAge: 30*24*60*60*1000}, //30 days
    secret: "s3cret",
    resave: false,
    saveUninitialized: false
}));

var cartController = require('./controllers/cart');
app.use((req, res, next) => {
    //cart
    var cart = new cartController(req.session.cart ?  req.session.cart : []);
    req.session.cart = cart;

    // user
    res.locals.user = req.session.user;
    res.locals.isLoggedIn = req.session.user ? true : false;

    next();
});

var models = require('./models');
app.get('/sync', function(req, res){
	models.sequelize.sync({force: true}).then(function(){
		res.send('database sync completed!');
	});
});

// routes
app.get('/', function(req, res){
	res.redirect('/places');
});

var placeRouter = require('./routes/places');
app.use('/places', placeRouter);

var userRouter = require('./routes/users');
app.use('/users', userRouter);

var cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);

var stadiumRouter = require('./routes/stadiums');
app.use('/stadiums', stadiumRouter);

var searchRouter = require('./routes/search');
app.use('/search', searchRouter);

var adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
    console.log(__dirname);
});