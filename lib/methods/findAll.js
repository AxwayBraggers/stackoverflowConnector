// TODO: Reference the module to connect to your data store.
var yourDataStore = /*require('your-data-store')*/{},
	Arrow = require('arrow'),
	request = require('request');

/**
 * Finds all model instances.  A maximum of 1000 models are returned.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the models.
 */
exports.findAll = function findAll(Model, callback) {
	
    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
        reqUri = `https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged=node.js&site=stackoverflow&filter=!-*f(6rc.(Xr5`;

    var options = {
            "url": reqUri,
            "method": "GET",
			body: true,
			json: true
        };

    request(options, function (err, response, body) {
        if (typeof body === "undefined") {
            callback(new ORMError("404 - Nothing found!"));
        }
		
		console.log(body);

        if (typeof body !== "object") {
            body = JSON.parse(body);
        }

        var modelData = JSON.parse(body);

        /*if (!err) {
            var instance = Model.instance(modelData, true);
            instance.setPrimaryKey(String(modelData.ID));

			var modelInstances = multipleToCollection(instance, Model);

            callback(null, modelInstances);
        } else {
            callback(new ORMError("Error: Could not delete post!"));
        }*/
    });
};


function multipleToCollection(data, Model) {
    if (data.length < 1)
        return [];

    instanceArray = [];
    for (var i = 0; i < data.length; i++) {
        var instance = Model.instance(data[i], true);

        instance.setPrimaryKey(String(data[i].ID));
        instanceArray.push(instance);
    }
    return instanceArray;
}