var Arrow = require('arrow');

// TODO: Rename "yourModel" (and this file) to whatever you want.
module.exports = Arrow.Model.extend('answer', {
	fields: {
		ID: {type: Number, required: true},
		owner: {type: String, required: true},
		display_name: {type: String, required: true},
		answerId: {type: Number}
	}
});