import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export type IAuthLogin = Pick<IUser, 'email' | 'password'>;

export const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }, // disable field __v
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
