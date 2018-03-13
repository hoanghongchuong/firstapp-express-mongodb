// bootstraping app
import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import expressLayouts from 'express-ejs-layouts'

import routes from '../routes/web'
import core_helpers from './core_helpers'
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var multer  = require('multer');
var session = require('express-session');
var passport = require('passport');
// using .env file mapping to process.env
dotenv.config()
// init core helper functions
core_helpers()

// connect database

// mongoose.connect(config('database.mongo')).then(
// 	() => {
// 		console.log('Connect DB successfully');
// 	},
// 	(err) => {
// 		console.log('Connect DB failed')
// 	}
// );

mongoose.connect('mongodb://admins:admins@ds059155.mlab.com:59155/firstapp').then(function() {
	console.log('Connect DB successfully');
}, function() {
	console.log('Connect DB failed')
})

let app = express()

var sessionStore = new session.MemoryStore;
require('../config/passport')(passport);
// using body parser for form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret:'secret123',
    saveUninitialized: true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// static files in public
app.use('/', express.static('public'))
// set view as ejs
app.set('view engine', 'ejs')

// set layouts
// app.set('layout', true)
// app.set('layout', 'front/layout')
app.use(expressLayouts)

app.use('/', function(request, response, next) {
	app.set('layout', 'front/layout');
	next();
})
app.use('/admin', function(request, response, next) {
	app.set('layout', 'admin/layout');
	next();
});
// booting routes
routes(app, passport)

export default app