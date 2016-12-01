var Arrow = require('arrow'),
    ORMError = Arrow.ORMError,
    request = require('request');
/**
 * Finds a model instance using the primary key.
 * @param {Arrow.Model} Model The model class being updated.
 * @param {String} id ID of the model to find.
 * @param {Function} callback Callback passed an Error object (or null if successful) and the found model.
 */
exports.findByID = function (Model, id, callback) {

    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
        reqUri = `${config.stackExchangeApiUrl}questions?&tagged=node.js&site=stackoverflow`;

    var options = {
            "url": reqUri,
            "method": "GET",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
            }
        };

    request(options, function (err, response, body) {
        // TODO Should extract proper body information to pass it to the callback
        if (typeof body === "undefined") {
            callback(new ORMError("404 - Nothing found!"));
        }
        if (typeof body !== "object") {
            body = JSON.parse(body);
        }
        var modelData = body;

        if (!err) {
            var instance = Model.instance(modelData, true);
            instance.setPrimaryKey(String(modelData.ID));
            callback(null, instance);
        } else {
            callback(new ORMError("Error: Could not delete post!"));
        }
    });
};