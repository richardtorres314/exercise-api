import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { AddressInfo } from 'net';
import { connect } from './database';
import { IUser, User } from './models/User';
dotenv.config();

connect();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('public'));

app.get('/', (req, res) => {
	res.json({});
});

app.get('/api/exercise/users', async (req, res) => {
	const users = await User.find();
	res.json(users);
});

app.post('/api/exercise/new-user', async (req, res) => {
	const { username }: IUser = req.body;
	let user = await User.findOne({ username });

	if (user) {
		res.json({
			error: 'User already exists'
		});
	}

	user = new User({ username });
	user.save().then((result) => {
		return res.json({
			username: result.username,
			_id: result._id
		});
	});
});

// Not found middleware
app.use((req, res, next) => {
	return next({ status: 404, message: 'not found' });
});

// Error Handling middleware
app.use((err, req, res, next) => {
	let errCode, errMessage;

	if (err.errors) {
		// mongoose validation error
		errCode = 400; // bad request
		const keys = Object.keys(err.errors);
		// report the first validation error
		errMessage = err.errors[keys[0]].message;
	} else {
		// generic or custom error
		errCode = err.status || 500;
		errMessage = err.message || 'Internal Server Error';
	}
	res.status(errCode).type('txt')
		.send(errMessage);
});

const listener = app.listen(process.env.PORT || 3000, () => {
	console.log('Your app is listening on port ' + (listener.address() as AddressInfo).port);
});
