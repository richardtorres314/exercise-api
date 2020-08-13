import { Document, model, Schema } from 'mongoose';

export interface IExercise extends Document {
	date?: Date;
	description: string;
	duration: number;
	userId: string;
}

const ExerciseSchema = new Schema<IExercise>(
	{
		date: {
			type: Date,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		duration: {
			type: Number,
			required: true
		},
		userId: {
			type: String,
			required: true
		}
	},
	{
		collection: 'exercises',
		versionKey: false
	}
);

export const Exercise = model<IExercise>('Exercise', ExerciseSchema, 'exercises');
