import Category from '../models/category'
import User from '../models/user'
var hash  = require('password-hash');
export function register(request, response){
		response.render('admin/register', {
			title: 'Register'
		});
}
export async function postRegister(request, response){
	var user = await User.findOne({email: request.body.email});
	if(user){
		console.log('Email da ton tai');
		return response.redirect('/register');
		
	}
	var newUser = new User({
		username: request.body.username,
		email: request.body.email,
		password: hash.generate(request.body.password)
	});
	newUser.save((err, result) => {
		if(err){
			console.log(err + '');
		}
		response.redirect('/login');
		// console.log('register successful');
	});
}

export function login(request, response){
	response.render('admin/login',{
		title: 'Login'
	});
}
export function index(request, response) {
	Category.find({}).sort({ _id: -1 }).select({
		name: 1,
		created_at: 1,
		status: 1,
		_id: 1
	}).exec((err, category) => {
		response.render('admin/index',{title: 'Admin', data: category});
	});	
	
}