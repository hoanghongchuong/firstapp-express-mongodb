/**
 * admin middleware
 * @param  {Object}   request 
 * @param  {Object}   response
 * @param  {Function} next callback
 * @return {Function}
 */
export default function(request, response, next) {
	let admin = true;
	if (admin) {
		return next()
	}
	return response.redirect('/')
}