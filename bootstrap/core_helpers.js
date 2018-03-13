export default function() {
    /**
     * get env variable
     * @param  {string} envAttr
     * @param  {string} defaultValue
     * @return {string}
     */
    global.env = function(envAttr, defaultValue) {
        return process.env[envAttr] || defaultValue
    }
    /**
     * get config
     * @param  {string} configAttr
     * @param  {string} defaultValue
     * @return {string|number|object}
     */
    global.config = function(configAttr, defaultValue) {
        let config = configAttr.split(/\./g)
        defaultValue = defaultValue || ''
        try {
            let configObj = require(__dirname + '/../config/' + config[0])
            let configVal = configObj.default || configObj
            if (config.length == 1) {
                return configVal
            }
            for (var i = 1; i < config.length; i++) {
                configVal = configVal[config[i]] || defaultValue
            }
            return configVal
        } catch (e) {
            return defaultValue
        }
    }
}