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

    var filter = "!ORaDYIE1sTWv8T9G0rSY_LCo3zU-YvwuFFn*CGz1MWA"; // Custom search filter to display questions and answers body

    var cnnctr = Model.getConnector(),
        config = cnnctr.config,
        reqUri = `https://api.stackexchange.com/2.2/questions?pagesize=3&order=desc&sort=activity&tagged=node.js&site=stackoverflow&filter=${filter}`;

    var options = {
        "url": reqUri,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
        },
        gzip: true
    };

    request(options, function (err, response, body) {
        if (typeof body === "undefined") {
            callback(new ORMError("404 - Nothing found!"));
        }
    
        // body always comes as string
        var modelData = JSON.parse(body);

        if (!err) {
            var modelInstances =  multipleToCollection(modelData, Model);

            callback(null, new Arrow.Collection(Model, modelInstances));
        }
    });
};


function multipleToCollection(data, Model) {
    if (data.length < 1)
        return [];

    var modelData = data.items;
    instanceArray = [];
   for (var i = 0; i < modelData.length; i++) {
       
        var instance = Model.instance(modelData[i], true);
        instance.setPrimaryKey(String(modelData[i].question_id));
        instanceArray.push(instance);
    }
    return instanceArray;
}