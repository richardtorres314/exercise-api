import * as dotenv from 'dotenv';
import Mongoose from 'mongoose';

dotenv.config();
let database: Mongoose.Connection;

export const connect = () => {
	if (database) {
		return;
	}

	Mongoose.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	}).then(() => {
		console.log("MongoDB database connection established successfully");
	}).catch(error => {
		console.log("Error connecting to database: ", error);
		return process.exit(1);
	});
};

export const disconnect = () => {
	if (!database) {
		return;
	}

	Mongoose.disconnect();
};
