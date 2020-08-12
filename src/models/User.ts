import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
	username: string;
}

const UserSchema = new Schema<IUser>(
	{
		username: {
			type: String,
			required: true,
			unique: true
		}
	},
	{
		collection: 'users',
		versionKey: false
	}
);

export const User = model<IUser>('User', UserSchema, 'users');
