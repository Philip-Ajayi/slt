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
    certificatedTraining: { type: String },
    schoolOfMinistry: { type: String },
    volunteerRole: { type: String, default: "" },
    accommodation: { type: String },
    gender: { type: String }, // required if accommodation is provided
    status: {
      type: String,
      enum: ["firsttime", "member", "none"],
      default: "none",
    },
    year: { type: Number, required: true },
    uniqueId: { type: String, required: true },
    subscribed: { type: Boolean, default: true },
    attendance: [AttendanceSchema],
  },
  { timestamps: true }
);

// ✅ Compound index: Unique ID per year
UserSchema.index({ year: 1, uniqueId: 1 }, { unique: true });
UserSchema.index({ year: 1 });

export const User = models.User || model("User", UserSchema);
