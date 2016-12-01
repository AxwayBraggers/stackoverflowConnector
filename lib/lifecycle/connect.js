// TODO: Reference the module to connect to your data store.

/**
 * Connects to your data store; this connection can later be used by your connector's methods.
 * @param next
 */
exports.connect = function (next) {
	var self = this,
        config = this.config;
        
    next();
}
