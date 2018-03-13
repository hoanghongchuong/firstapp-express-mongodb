import mongoose, { Schema } from 'mongoose'

/**
 * defined shared static methods
 * @type {Object}
 */
let sharedStatics = {
	getAll: function() {
		return this.find()
	}
}

/**
 * defined methods
 * @type {Object}
 */
let sharedMethods = {

}

/**
 * model registry
 * @param  {string} collection
 * @param  {object} schema
 * @param  {object} methods
 * @param  {object} statics
 * @return {object}
 */
export default function(collection, schema, methods, statics) {
	let modelSchema = new Schema(schema);

	methods = methods || {}
	statics = statics || {}

	modelSchema.statics = Object.assign(sharedStatics, statics)
	modelSchema.methods = Object.assign(sharedMethods, methods)

	return mongoose.model(collection, modelSchema);
}