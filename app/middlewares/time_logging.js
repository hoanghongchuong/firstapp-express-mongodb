/**
 * demo middleware for time logging
 * @param  {Object}   request 
 * @param  {Object}   response
 * @param  {Function} next callback
 * @return {Function}
 */
export default function(request, response, next) {
	console.log((new Date()).toString())
	return next()
}