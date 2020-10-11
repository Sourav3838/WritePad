const mongoose = require('mongoose');
const StorySchema = new mongoose.Schema({
	title: {
		type: String,
        required: true,
        trim:true,
	},
	body: {
		type: String,
		required: true,
	},
	status: {
		type: String,
        default: 'public',//all stories created by the user are by default public
        enum:['public','private']//set of all possible values(a story can be either public or private..choice is on creator)
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',//reference to user model
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});
module.exports = mongoose.model('Story', StorySchema);