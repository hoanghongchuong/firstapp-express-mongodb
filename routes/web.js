import { Router } from 'express'
import * as home_controller from '../app/controllers/home_controller'
import * as admin_controller from '../app/controllers/admin_controller'
import * as category_controller from '../app/controllers/admin/category_controller'
import * as product_controller from '../app/controllers/admin/product_controller'
import * as member_controller from '../app/controllers/admin/member_controller'
import time_logging from '../app/middlewares/time_logging'
import admin_authentication from '../app/middlewares/admin_authentication'
import * as user_controller from '../app/controllers/admin/user_controller'
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({
    storage: storage
});
export default function(route, passport) {
	// defined routes
	route.get('/', time_logging, home_controller.index)

	// router frontend
	// for using prefix and middleware router
	// const adminRoutes = Router();
	// route.use('', admin_authentication, adminRoutes)
	// adminRoutes.get('/', admin_controller.index)

	// for not prefix
	route.get('/customer/login', home_controller.login)
	route.get('/project/:id', home_controller.project);
	route.get('/detail/:cateid/:id', home_controller.detail);
	route.post('/post-comment', isCustomer, home_controller.comment);
	route.post('/customer/login', passport.authenticate('customer', {
		successRedirect : '/',
        failureRedirect : '/customer/login',
		failureFlash : true,
	}));
	// route.post('/customer/login', home_controller.clogin);
	// route admin
	// route.use('*', admin_authentication);
	route.use('/admin*', function(request, response, next) {
		route.set('layout', 'admin/layout');
		return next();
	});
	// route register
	route.get('/register', admin_controller.register);
	route.post('/register', admin_controller.postRegister);

	//route login
	route.get('/login', admin_controller.login);
	route.post('/login', passport.authenticate('login',{
		successRedirect : '/admin',
        failureRedirect : '/login',
		failureFlash : true,
	}));
	route.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/login');
	});
	// route category
	route.get('/admin', isAdmin, admin_controller.index);
	route.get('/admin/category', isAdmin, category_controller.index);
	route.get('/admin/category/create', isAdmin, category_controller.create);
	route.post('/admin/category/create', isAdmin, category_controller.postCreate);
	route.get('/admin/category/edit/:id', isAdmin, category_controller.edit);
	route.post('/admin/category/edit', isAdmin, category_controller.postEdit);
	route.get('/admin/category/delete/:id', isAdmin, category_controller.deleteCategory);
	// route product
	route.get('/admin/product', isAdmin, product_controller.index);
	route.get('/admin/product/create/:cateid', isAdmin, product_controller.create);
	route.post('/admin/product/create',upload.single('imageUrl'), product_controller.postCreate);
	route.get('/admin/product/edit/:id', isAdmin, product_controller.edit);
	route.post('/admin/product/edit', upload.single('imageUrl'), product_controller.postEdit);
	route.get('/admin/product/delete/:id', isAdmin, product_controller.deleteProduct)
	//route member
	route.get('/admin/member', isAdmin, member_controller.index);
	route.get('/admin/member/create', isAdmin, member_controller.create);
	route.post('/admin/member/create', isAdmin, member_controller.postCreate);
	route.get('/admin/member/edit/:id', isAdmin, member_controller.edit);
	route.post('/admin/member/edit', isAdmin, member_controller.postEdit);
	route.get('/admin/member/delete/:id', isAdmin, member_controller.deleteMember);
	// route profile admin
	route.get('/admin/profile', user_controller.index);
	route.post('/admin/profile/edit', user_controller.update);
}

function isAdmin(req, res, next){
    if(req.user.admin)
    return next();
    res.redirect('/login');
};

function isCustomer(req, res, next){
    if(req.user.customer) {}
    return next();

	if (req.xhr) {
		return res.json({
			error: 'Not customer'
		});
	}
    res.redirect('/customer/login');
};
