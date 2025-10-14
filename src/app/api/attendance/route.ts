import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Attendance } from "@/models/Attendance";

/**
 * ✅ POST — Mark or unmark attendance
 */
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { userId, session, marked = true } = await req.json();
    const year = new Date().getFullYear();

    if (!userId || session == null) {
      return NextResponse.json(
        { error: "Missing userId or session" },
        { status: 400 }
      );
    }

    if (marked) {
      await Attendance.findOneAndUpdate(
        { user: userId, year, session },
        { marked: true, date: new Date() },
        { upsert: true, new: true }
      );
    } else {
      await Attendance.deleteOne({ user: userId, year, session });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("[POST /api/attendance] Error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * ✅ PATCH — Update user fields (gender, accommodation, trainings, etc.)
 */
export async function PATCH(req: Request) {
  try {
    await dbConnect();

    const {
      userId,
      accommodation,
      gender,
      certificatedTraining,
      schoolOfMinistry,
    } = (await req.json()) as {
      userId?: string;
      accommodation?: string;
      gender?: string;
      certificatedTraining?: string;
      schoolOfMinistry?: string;
    };

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // ✅ Explicitly typed update object (no `any`)
    const update: Partial<{
      accommodation: string;
      gender: string;
      certificatedTraining: string;
      schoolOfMinistry: string;
    }> = {};

    if (accommodation !== undefined)
      update.accommodation = accommodation.toLowerCase();
    if (gender !== undefined) update.gender = gender.toLowerCase();
    if (certificatedTraining !== undefined)
      update.certificatedTraining = certificatedTraining;
    if (schoolOfMinistry !== undefined)
      update.schoolOfMinistry = schoolOfMinistry;

    const updated = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error: unknown) {
    console.error("[PATCH /api/attendance] Error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * ✅ GET — Fetch users by attendance type
 */
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year")) || new Date().getFullYear();
    const type = searchParams.get("type") || "attended";

    // ✅ Attended
    if (type === "attended") {
      const attendedUsers = await Attendance.find({ year })
        .populate("user")
        .lean();
      const users = attendedUsers.map((a) => a.user);
      return NextResponse.json({ users });
    }

    // ✅ Absent
    if (type === "absent") {
      const attendedIds = await Attendance.find({ year }).distinct("user");
      const absentUsers = await User.find({
        year,
        _id: { $nin: attendedIds },
      });
      return NextResponse.json({ users: absentUsers });
    }

    // ✅ Never attended (across all years)
    if (type === "never") {
      const attendedIds = await Attendance.distinct("user");
      const neverAttended = await User.find({
        _id: { $nin: attendedIds },
      });
      return NextResponse.json({ users: neverAttended });
    }

    // ✅ Accommodation
    if (type === "accommodation") {
      const attendedIds = await Attendance.find({ year }).distinct("user");
      const accommodationUsers = await User.find({
        _id: { $in: attendedIds },
        accommodation: { $regex: /^yes$/i },
      });
      return NextResponse.json({ users: accommodationUsers });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: unknown) {
    console.error("[GET /api/attendance] Error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
