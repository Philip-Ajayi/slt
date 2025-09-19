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
    const qrBuffer = await QRCode.toBuffer(qrUrl, { width: 200 });

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Salt and Light ${year} Registration`,
      html: `
        <div style="font-family: 'Segoe UI'; max-width: 600px; margin: auto;">
          <div style="background-color: #6a0dad; padding: 15px; text-align: center;">
            <img src="https://slt.onrender.com/events/hero.png" alt="Salt and Light" style="max-width: 100%;" />
          </div>
          <div style="padding: 30px 40px; color: #333;">
            <h3 style="color: #6a0dad;">Hi ${firstName},</h3>
            <p>Your registration for <strong>Salt and Light ${year}</strong> is successful!</p>
            <p><strong>Your Unique ID:</strong> ${uniqueId}</p>
            <p>Please scan or show the attached QR code for quick check-in.</p>
            <hr style="border-top: 2px solid #6a0dad;" />
            <p><strong>Date:</strong> October 13–17, 2025</p>
            <p><strong>Venue:</strong> Behind Accord Building, Obadeyi Estate, Samonda, Ibadan</p>
            <div style="text-align: center; margin: 30px 0;">
              <img src="cid:qrCode" alt="QR Code" style="max-width: 160px; border: 2px solid #6a0dad;" />
            </div>
            <p style="color: #6a0dad; font-weight: 600;">Thank you!</p>
          </div>
          <footer style="background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666; padding: 15px;">
            &copy; MIV Word House | <a href="http://www.mivwordhouse.com" style="color: #4b0082;">Visit Website</a>
          </footer>
        </div>
      `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrBuffer,
          cid: "qrCode",
        },
      ],
    });

    if (volunteerRole && volunteerRole.trim() !== "") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || "adeguntimileyin6@gmail.com",
        subject: `New Volunteer Registration: ${firstName} ${lastName}`,
        html: `
          <h3>New Volunteer Registered</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${whatsapp}</p>
          <p><strong>Volunteer Role:</strong> ${volunteerRole}</p>
          <p><strong>Heard About Us:</strong> ${referralSource || "N/A"}</p> <!-- ✅ Included -->
        `,
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
