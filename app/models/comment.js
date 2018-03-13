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
    updated_at: {
        type: Date,
        default: Date.now
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