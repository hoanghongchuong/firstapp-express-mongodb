import Post from '../models/post'
import Product from '../models/product'
import Category from '../models/category'
import Comment from '../models/comment'
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
	var comment = await Comment.findOne({product_id: request.params.id}).sort({_id: -1});
	// console.log(comment);
	return response.render('front/detail', {
		title: detail.name,
		detail: detail,
		products: products,
		cate_id: category._id,
		comment: comment,
		mess: request.flash('mess')
	});
}

export async function comment(req, res){
	
	let product_id = req.body.product_id;
	let comment = await Comment.findById({_id: product_id});
	let newValues = new Comment({
		content: req.body.content,
		product_id: product_id
	});
	// console.log(newValues);
	// return 1;
	newValues.save((err, result) => {
		if(err) console.log(err + '');
		// req.flash('mess', 'Gửi phản hồi thành công!');
		req.toastr.success('Gửi phản hồi thành công');
		
		res.redirect('back');
	});
}