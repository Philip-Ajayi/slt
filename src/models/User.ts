import mongoose, { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema({
  date: { type: Date, required: true },
  session: { type: Number, required: true },
  marked: { type: Boolean, default: false },
});

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    whatsapp: { type: String, required: true },
    certificatedTraining: { type: String }, // no longer required
    schoolOfMinistry: { type: String },    // no longer required
    volunteerRole: { type: String, default: "" }, // optional, default empty string
    accommodation: { type: String },       // no longer required
    year: { type: Number, required: true },
    subscribed: { type: Boolean, default: true },
    attendance: [AttendanceSchema],
  },
  { timestamps: true }
);

export const User = models.User || model("User", UserSchema);
