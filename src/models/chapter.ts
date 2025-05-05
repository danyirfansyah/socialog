import mongoose, { Document, Model, Schema } from "mongoose";

interface ICourse extends Document {
  id: string;
  title: string;
  content: string;
  courseId: mongoose.Types.ObjectId;
}

const chapterSchema: Schema<ICourse> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Chapter: Model<ICourse> =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export default Chapter;
