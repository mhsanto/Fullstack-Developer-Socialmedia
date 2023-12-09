import { model } from "mongoose";
import { Document, models } from "mongoose";
import { Schema } from "mongoose";
export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}
const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true ,unique:true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: false }, // You may want to enforce required based on your authentication logic
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  portfolioWebsite: { type: String },
  reputation: { type: Number,default:0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }], // Assuming there is another model named 'SavedItem'
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
