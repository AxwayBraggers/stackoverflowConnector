/**
 * NOTE: This file is simply for testing this connector and will not
 * be used or packaged with the actual connector when published.
 */
var Arrow = require('arrow'),
	server = new Arrow();

// TODO: Define a model that you can use when you run the connector locally for testing.
server.addModel(Arrow.Model.extend('tbray', {
	fields: {
		// TODO: Add fields to it.
		title: {type: String}
	},
	connector: 'com.axway.braggers.stackoverflow'
}));


server.on("starting", function() {
    server.port = 8989;
});

server.on("started", function() {
    var connector = Arrow.getConnector('com.axway.braggers.stackoverflow');
});

server.start();

