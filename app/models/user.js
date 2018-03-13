import model from './model'
import { Schema } from 'mongoose'
var bcrypt = require('bcrypt-nodejs');
/**
 * defined schema
 * @type {Object}
 */
let schema = {	
    username: {
        type: String,
        require: true
    },
	email: {
        type: String,
        unique: true,
        require: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        require: true
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

export default model('user', schema, methods, statics)