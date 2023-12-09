import { Schema, model, models } from "mongoose";

interface ITag extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  question: Schema.Types.ObjectId[];
  followers: Schema.Types.ObjectId[];
  createdOn: Date;
}
const TagSchema = new Schema<ITag>({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  question: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
