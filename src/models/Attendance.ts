// models/Attendance.ts
import { Schema, model, models, Document, Types } from "mongoose";

export interface IAttendance extends Document {
  user: Types.ObjectId;
  year: number;
  date: Date;
  session: number;
  marked: boolean;
}

const AttendanceSchema = new Schema<IAttendance>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    year: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    session: { type: Number, required: true },
    marked: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Prevent duplicate marking per user per session per year
AttendanceSchema.index({ user: 1, year: 1, session: 1 }, { unique: true });

export const Attendance =
  models.Attendance || model<IAttendance>("Attendance", AttendanceSchema);
