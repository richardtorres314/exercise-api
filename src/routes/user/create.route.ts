import { IUser, User } from '../../models/User';

export async function userCreateRoute(req, res) {
	const { username }: IUser = req.body;
	let user = await User.findOne({ username });

	if (user) {
		res.json({
			error: 'User already exists'
		});
	}

	user = new User({ username });
	user.save().then((result) =>
		res.json({
			username: result.username,
			_id: result._id
		})
	);
}
