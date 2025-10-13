import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Attendance } from "@/models/Attendance";

// -------------------- POST: Mark / Unmark Attendance --------------------
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
      // ✅ Mark attendance (create or update)
      await Attendance.findOneAndUpdate(
        { user: userId, year, session },
        { marked: true, date: new Date() },
        { upsert: true, new: true }
      );
    } else {
      // ✅ Unmark attendance (delete record)
      await Attendance.deleteOne({ user: userId, year, session });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// -------------------- GET: Fetch Attendance Data --------------------
export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year")) || new Date().getFullYear();
    const type = searchParams.get("type") || "attended";

    // ✅ 1. Attended users
    if (type === "attended") {
      const attendedUsers = await Attendance.find({ year })
        .populate("user")
        .lean();
      const users = attendedUsers.map((a) => a.user);
      return NextResponse.json({ users });
    }

    // ✅ 2. Absent users
    if (type === "absent") {
      const attendedIds = await Attendance.find({ year }).distinct("user");
      const absentUsers = await User.find({
        year,
        _id: { $nin: attendedIds },
      });
      return NextResponse.json({ users: absentUsers });
    }

    // ✅ 3. Never attended (no attendance ever)
    if (type === "never") {
      const attendedIds = await Attendance.distinct("user");
      const neverAttended = await User.find({
        _id: { $nin: attendedIds },
      });
      return NextResponse.json({ users: neverAttended });
    }

    // ✅ 4. Accommodation view (grouped by gender)
    if (type === "accommodation") {
      const users = await User.find({ year }).select(
        "firstName lastName accommodation gender year uniqueId"
      );

      const male = users.filter(
        (u) => u.gender?.toLowerCase() === "male" || u.gender === "m"
      );
      const female = users.filter(
        (u) => u.gender?.toLowerCase() === "female" || u.gender === "f"
      );

      return NextResponse.json({ male, female });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error: unknown) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
