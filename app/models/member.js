import model from './model'
import { Schema } from 'mongoose'
/**
 * defined schema
 * @type {Object}
 */
let schema = {
	name: {
		type: String,
		require: true
	},
	email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    category_id: {
		type: Schema.Types.ObjectId, ref: 'category' ,
	},
	created_at: {
		type: Date,
		default: Date.now
	},
}

/**
 * defined static methods
 */
let statics = {
	// create(data) {
	// 	this.name = data;
	// 	return this.save();
	// }
}

/**
 * defined methods
 */
let methods = {

}

export default model('member', schema, methods, statics)