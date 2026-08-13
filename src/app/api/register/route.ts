import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Counter } from "@/models/Counter";
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
  referralSource?: string;
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

const FROM_EMAIL = process.env.FROM_EMAIL!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const BASE_URL = process.env.BASE_URL!;

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
      referralSource = "",
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
    const registrationUrl = `${BASE_URL}/register/${uniqueId}`;
    const qrBuffer = await QRCode.toBuffer(registrationUrl, { type: "png", width: 200 });

    // Send registration email with QR code attachment
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: email,
        subject: `Salt and Light ${year} Registration`,
        html: `
          <div style="font-family: 'Segoe UI'; max-width: 600px; margin: auto;">
            <div style="background-color: #6a0dad; padding: 15px; text-align: center;">
              <img src="https://slt.onrender.com/main/flier.jpeg" alt="Salt and Light" style="max-width: 100%;" />
            </div>
            <div style="padding: 30px 40px; color: #333;">
              <h3 style="color: #6a0dad;">Hi ${firstName},</h3>
              <p>Your registration for <strong>Salt and Light ${year}</strong> is successful!</p>
              <p><strong>Your Unique ID:</strong> ${uniqueId}</p>
              <p>Please scan or show the attached QR code for quick check-in.</p>
              <hr style="border-top: 2px solid #6a0dad;" />
              <p><strong>Date:</strong> October 12–16, 2026</p>
              <p><strong>Venue:</strong> Behind Accord Building, Obadeyi Estate, Samonda, Ibadan</p>
              <p style="color: #6a0dad; font-weight: 600;">Thank you!</p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: "qrcode.png",
            content: qrBuffer.toString("base64"),
            type: "image/png",
            disposition: "inline", // ensures it's inline if client supports
            cid: "qrCode",
          },
        ],
      }),
    });

    // Notify admin if volunteer
    if (volunteerRole && volunteerRole.trim() !== "") {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `New Volunteer Registration: ${firstName} ${lastName}`,
          html: `
            <h3>New Volunteer Registered</h3>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${whatsapp}</p>
            <p><strong>Volunteer Role:</strong> ${volunteerRole}</p>
            <p><strong>Heard About Us:</strong> ${referralSource || "N/A"}</p>
          `,
        }),
      });
    }

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
      referralSource,
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
