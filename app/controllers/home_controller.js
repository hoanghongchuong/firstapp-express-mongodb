import Post from '../models/post'
import Product from '../models/product'
import Category from '../models/category'
import Comment from '../models/comment'
var passport = require('passport');
/**
 * index action
 * @param  {object} request
 * @param  {object} response
 * @return {string}
 */
// export async function index(request, response) {
// 	let posts = await Post.getAll();
// 	return response.render('front/index', { posts })
// }
export async function index(request, response) {
	var a = 'sdfsdf';
	return response.render('admin/login', {
		a: a,
		title: 'Home'
	});
}
export async function project(request, response){
	var category = await Category.findOne({_id: request.params.id});	
	var products = await Product.find({category_id: request.params.id}).sort({numb_sort: 1});
	return response.render('front/project',{
		title: category.name,
		category: category,
		products: products
	})
}

export async function detail(request, response) {
	var detail = await Product.findOne({_id: request.params.id});
	var category = await Category.findOne({_id: request.params.cateid});
	var products = await Product.find({category_id: request.params.cateid}).sort({numb_sort: 1});
	var next = "";
	var pre = "";
	// var session_user;
	if(request.user){
		if(request.user.customer){
			var session_user = request.user.customer;
			if(request.user.customer.category_id.equals(detail.category_id)){
				var sessionCate = request.user.customer.category_id;
			}
		}
		
	}
	for(var i = 0; i < products.length; i++){		
		if(products[i]._id.equals(detail._id)){
			if(i +1  < products.length){
				next = products[i +1]._id;
			}
			if(i > 0){
				pre = products[i -1]._id;
			}			
			break;
		}
	}
	var comment = await Comment.findOne({product_id: request.params.id}).sort({_id: -1});
	return response.render('front/detail', {
		title: detail.name,
		detail: detail,
		products: products,
		cate_id: category._id,
		comment: comment,
		next: next,
		pre: pre,
		session_user: session_user,
		sessionCate: sessionCate,
		mess: request.flash('mess')
	});
}
export async function clogin(req, res, next){
	var detail_id = req.body.detail_id;
	var cate_id = req.body.cate_id;
	passport.authenticate('comment', function(err, sponsor, info) {
        var error = err || info;
		if (error) return res.json(401, error);
        req.logIn(sponsor, function(err) {
			if (err) return res.send(err);
			// console.log(req.user);
			// res.redirect('back');
            res.json(req.sponsor.profile);
        });
	})(req, res, next);
}
export async function comment(req, res){	
	let product_id = req.body.product_id;
	let comment = await Comment.findById({_id: product_id});
	let newValues = new Comment({
		content: req.body.content,
		product_id: product_id,
		updated_at: Date.now()
	});
	newValues.save((err, result) => {
		if(err) console.log(err + '');
		req.toastr.success('Gửi phản hồi thành công');		
		res.redirect('back');
	});
}

export function login(req, res) {
	return res.render('front/login', {
		layout: 'front/layout/_null'
	});
}