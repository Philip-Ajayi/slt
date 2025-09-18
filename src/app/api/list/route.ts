// app/api/list/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User, IUser } from "@/models/User";
import type { FilterQuery } from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get("year") || "2025");
    const accommodation = searchParams.get("accommodation");

    // Use FilterQuery<IUser> to type the MongoDB query object
    const query: FilterQuery<IUser> = { year };
    if (accommodation === "true") {
      query.accommodation = { $ne: "" }; // filter users that have non-empty accommodation
    }

    const users = await User.find(query).lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}
