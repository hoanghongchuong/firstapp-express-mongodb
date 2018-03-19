import Category from '../../models/category'
import Member from '../../models/member'
var mongoose = require('mongoose');

/** 
 * member index action
 */
export async function index(req, res){
    // let members = await Member.find({}).sort({_id: -1});
    var members = await Member.find().populate({ path: 'category_id' });
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
        res.redirect('/admin/member');
    });
}
export async function edit(req, res){
    let member_id = mongoose.Types.ObjectId(req.params.id);
    var category = await Category.find();
    var member = await Member.findById({_id: member_id});
    res.render('admin/member/edit', {
        title: 'Edit Member',
        member: member,
        category: category
    });
}
export async function postEdit(req, res){
    let conditions = {};
    if(mongoose.Types.ObjectId.isValid(req.body.memberId) == true){
		conditions._id = mongoose.Types.ObjectId(req.body.memberId);
	}else{
        res.json({
            result: "faild",
            data: {},
            message: "you must enter your member_id to update"
        });
	}
    let newValues = {};
    if(req.body.name && req.body.name.length > 1){
        newValues.name = req.body.name;
    }
    newValues.email = req.body.email;
    newValues.password = req.body.password;
    newValues.category_id = req.body.category_id;
    const options = {
        new: true,
        multi: true
    }
    Member.findOneAndUpdate(conditions, {$set: newValues}, options, (err, member) => {
		res.redirect('back');
	});
}
export async function deleteMember(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
	Member.findOneAndRemove({_id: id}, (err) => {
		res.redirect('back');
	})

}