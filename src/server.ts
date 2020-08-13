import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { AddressInfo } from 'net';
import { connect } from './database';
import { exerciseCreateRoute } from './routes/exercise/create.route';
import { exerciseListRoute } from './routes/exercise/list.route';
import { User } from './models/User';
import { userCreateRoute } from './routes/user/create.route';
import { userListRoute } from './routes/user/list.route';
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

// User Routes
app.get('/api/exercise/users', userListRoute);
app.post('/api/exercise/new-user', userCreateRoute);

// Exercise Routes
app.get('/api/exercise/log', exerciseListRoute);
app.post('/api/exercise/add', exerciseCreateRoute);

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
