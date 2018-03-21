import User from '../../models/user'
var hash  = require('password-hash');
var mongoose = require('mongoose');
export async function index(req, res) {
    var user_id = req.user.id;
    var user = await User.findById(user_id);   
    // console.log(user.password);
    // console.log(req.user.password); 
    res.render('admin/user/edit', {
        user: user,
        title: 'Profile user'
    });
}
export async function update(req, res){
    let conditions = {};
    if(mongoose.Types.ObjectId.isValid(req.body.user_id) == true){
		conditions._id = mongoose.Types.ObjectId(req.body.user_id);
	}else{
        res.json({
            result: "faild",
            data: {},
            message: "you must enter your member_id to update"
        });
	}
    let newValues = {};    
    newValues.username = req.body.name;
    newValues.email = req.body.email;
    if(req.body.password){
        newValues.password = hash.generate(req.body.password);
    }
    const options = {
        new: true,
        multi: true
    }
    User.findOneAndUpdate(conditions, {$set: newValues}, options, (err, user) => {
		res.redirect('back');
	});
}