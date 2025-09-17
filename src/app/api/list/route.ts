// app/api/list/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const year = parseInt(searchParams.get("year") || "2025");
    const accommodation = searchParams.get("accommodation");

    const query: any = { year };
    if (accommodation === "true") {
      query.accommodation = { $ne: "" }; // has some value
    }

    const users = await User.find(query).lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch users." }, { status: 500 });
  }
}
