import mongoose, { Document, Model, Schema } from "mongoose";

interface ICourse extends Document {
  id: string;
  title: string;
  category: string;
}

const courseSchema: Schema<ICourse> = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
