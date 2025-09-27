import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Counter } from "@/models/Counter";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

interface RegisterPayload {
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
  status?: "firsttime" | "member" | "none";
  referralSource?: string; // ✅ New field
}

function isMongoError(error: unknown): error is { code?: number } {
  return typeof error === "object" && error !== null && "code" in error;
}

async function generateUniqueId(year: number): Promise<string> {
  const prefix = `SLT${year}`;

  let counter = await Counter.findOneAndUpdate(
    { year },
    { $inc: { seq: 1 } },
    { new: true }
  );

  if (!counter) {
    await Counter.create({ year, seq: 200 });
    counter = await Counter.findOneAndUpdate(
      { year },
      { $inc: { seq: 1 } },
      { new: true }
    );
  }

  return `${prefix}${counter.seq}`;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const {
      firstName,
      lastName,
      email,
      location,
      whatsapp,
      certificatedTraining = "",
      schoolOfMinistry = "",
      volunteerRole = "",
      accommodation = "",
      gender = "",
      status = "none",
      referralSource = "", // ✅ Destructure new field
    } = (await req.json()) as RegisterPayload;

    const year = new Date().getFullYear();

    if (accommodation && !gender) {
      return NextResponse.json(
        { error: "Gender is required when accommodation is requested." },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email, year });
    if (existing) {
      return NextResponse.json(
        { error: "User already registered this year" },
        { status: 400 }
      );
    }

    const uniqueId = await generateUniqueId(year);

    const qrUrl = `https://slt.mivwordhouse.com/register/${uniqueId}`;
    const qrBuffer = await QRCode.toBuffer(qrUrl, { width: 200 })

    const user = await User.create({
      firstName,
      lastName,
      email,
      location,
      whatsapp,
      certificatedTraining,
      schoolOfMinistry,
      volunteerRole,
      accommodation,
      gender,
      status,
      year,
      subscribed: true,
      uniqueId,
      referralSource, // ✅ Save to DB
    });

    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);

      if (isMongoError(error) && error.code === 11000) {
        return NextResponse.json(
          { error: "Duplicate registration detected. Please try again." },
          { status: 400 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Unknown error", error);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

