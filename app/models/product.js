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
	image: {
		type: String
	},
	category_id: {
		type: Schema.Types.ObjectId, ref: 'category' ,
	},
	numb_sort: {
		type: Number
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
	
}

/**
 * defined methods
 */
let methods = {

}

export default model('product', schema, methods, statics)