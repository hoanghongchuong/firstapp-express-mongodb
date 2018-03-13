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
	status: {
        type:[{
            type:String,
            enum: ['available', 'unavailable']
        }],
        default: ['available']
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
	create(data) {
		this.name = data;
		return this.save();
	}
}

/**
 * defined methods
 */
let methods = {

}

export default model('category', schema, methods, statics)