import { Exercise, IExercise, User } from '../../models';
import { MongooseFilterQuery } from 'mongoose';
import { Request, Response } from 'express';

interface Query {
	userId: string;
	limit?: string;
	from?: string;
	to?: string;
}

export async function exerciseListRoute(req: Request<any, any, any, Query>, res: Response) {
	const { userId, limit, from, to } = req.query;
	const user = await User.findById(userId);

	const query: MongooseFilterQuery<IExercise> = { userId };

	if (from) {
		query.date = { ...query.date, $gte: new Date(from) };
	}

	if (to) {
		query.date = { ...query.date, $lte: new Date(to) };
	}

	const log = await Exercise
		.find(query)
		.limit(Number(limit) || null);

	res.json({
		...user.toJSON(),
		log,
		count: log.length
	});
}
