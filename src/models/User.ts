import mongoose, { Schema, model, models, Document } from "mongoose";

// Interface for Attendance subdocument
export interface IAttendance {
  date: Date;
  session: number;
  marked?: boolean;
}

// Interface for User document
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  whatsapp: string;
  certificatedTraining?: string;
  schoolOfMinistry?: string;
  volunteerRole?: string;
  accommodation?: string;
  gender?: string;
  status: "firsttime" | "member" | "none";
  year: number;
  uniqueId: string;
  subscribed?: boolean;
  attendance: IAttendance[];
  createdAt: Date;
  updatedAt: Date;
}

const AttendanceSchema = new Schema<IAttendance>({
  date: { type: Date, required: true },
  session: { type: Number, required: true },
  marked: { type: Boolean, default: false },
});

const UserSchema = new Schema<IUser>(
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

// Compound index: Unique ID per year
UserSchema.index({ year: 1, uniqueId: 1 }, { unique: true });
UserSchema.index({ year: 1 });

export const User = models.User || model<IUser>("User", UserSchema);
