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
	product_id: {
        type: Schema.Types.ObjectId,
    },
    content: {
        type: String,
    },
	created_at: {
		type: Date,
		default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date
    }
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

export default model('comment', schema, methods, statics)