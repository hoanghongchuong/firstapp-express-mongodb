import Category from '../../models/category'
import Member from '../../models/member'
var mongoose = require('mongoose');

/** 
 * member index action
 */
export async function index(req, res){
    let members = await Member.find({}).sort({_id: -1});
    var category = await Category.find();
    res.render('admin/member/index',{
        members: members,
        title: 'Member',
        category: category
    });
}
export async function create(req, res){
    var category = await Category.find();
    res.render('admin/member/create', {
        title: 'Thêm',
        category: category
    });
}
export function postCreate(req, res){
    const newMember = new Member({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        category_id: req.body.category_id
    });
    newMember.save((err, result) => {
        res.redirect('/admin/member/');
    });
}