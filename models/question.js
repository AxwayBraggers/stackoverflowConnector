var Arrow = require('arrow');

// TODO: Rename "yourModel" (and this file) to whatever you want.
module.exports = Arrow.Model.extend('question', {
	fields: {
		ID: {type: Number, required: true},
		tags: {type: Array, required: true},
		display_name: {type: String},
		title: {type: String, required: true},
        questionId: {type: Number, required: true},
        answers: {type: Number},
        url: {type: String}
	}
});