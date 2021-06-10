require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DBCONNECT, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error'));
db.once('open', function () {
	console.log("I\'m in >:)");
});	

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	username: {
		type: String,
		unique: true, 
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const entriesSchema = new mongoose.Schema({
	title: String,
	mood: {
		type: String,
		required: true
	},
	entry: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	}
});

const User = mongoose.model('users', userSchema);
const Entry = mongoose.model('entries', entriesSchema);

module.exports = {
	User,
	Entry
};