import Post from '../models/post'
import Product from '../models/product'
import Category from '../models/category'
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
	return response.render('front/detail', {
		title: detail.name,
		detail: detail,
		products: products,
		cate_id: category._id
	});
}