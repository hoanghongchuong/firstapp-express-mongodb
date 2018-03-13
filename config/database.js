export default {
	mongo: `mongodb://${env('DB_HOST', '127.0.0.1')}/${env('DB_NAME', 'express_mvc')}`
}