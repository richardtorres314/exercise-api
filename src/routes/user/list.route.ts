import { User } from '../../models/User';

export async function userListRoute(req, res) {
	const users = await User.find();
	res.json(users);
}
