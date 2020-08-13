import { Exercise, IExercise, User } from '../../models';
import { Request, Response } from 'express';

interface Payload extends IExercise {
	userId: string;
}

export async function exerciseCreateRoute(req: Request<any, Payload>, res: Response) {
	const { userId, ...exercisePayload } = req.body;

	if (!userId) {
		res.json({
			error: 'User ID required'
		});
	}

	const user = await User.findById(userId);

	if (!user) {
		res.json({
			error: 'User ID provided does not exist'
		});
	}

	const exercise = new Exercise({
		userId,
		...exercisePayload,
		date: exercisePayload.date || new Date()
	});

	await exercise.save();

	return {
		_id: user._id,
		username: user.username,
		description: exercise.description,
		duration: exercise.duration,
		date: exercise.date
	};
}

