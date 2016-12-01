var Arrow = require('arrow');

// TODO: Rename "yourModel" (and this file) to whatever you want.
module.exports = Arrow.Model.extend('question', {
	fields: {
		question_id: { type: String, required: true },
		owner: { type: Object, required: true },
		title: { type: String, required: true },
		body_markdown: { type: String, required: true },
		answers: { type: Array },
		tags: { type: Array },
		link: { type: String },
	}
});