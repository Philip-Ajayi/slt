import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

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
    } = await req.json();

    const year = new Date().getFullYear();

    // Check if user already registered this year
    const existing = await User.findOne({ email, year });
    if (existing) {
      return NextResponse.json(
        { error: "User already registered this year" },
        { status: 400 }
      );
    }

    // URL encode the email to safely include it in the URL
    const encodedEmail = encodeURIComponent(email);
    const qrUrl = `https://slt.mivwordhouse.com/register/${encodedEmail}`;

    // Generate QR code as Buffer with the email URL
    const qrBuffer = await QRCode.toBuffer(qrUrl, { width: 200 });

    // Configure Nodemailer for Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email with inline QR code
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Salt and Light Conference ${year} Registration`,
      html: `
        <h3>Hi ${firstName},</h3>
        <p>We are pleased to inform you that your registration for Salt and Light Conference ${year} has been successfully completed</p>
        <p>Kindly find the unique QR code attached to this message. Please ensure you have it with you for easy access during the program</p>
        <p>Thank you</p>
        <img src="cid:qrCode" />
      `,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrBuffer,
          cid: "qrCode",
        },
      ],
    });

    // If the user has volunteered, notify Philip
    if (volunteerRole && volunteerRole.trim() !== "") {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "adeguntimileyin6@gmail.com",
        subject: `New Volunteer Registration: ${firstName} ${lastName}`,
        html: `
          <h3>New Volunteer Registered</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${whatsapp}</p>
          <p><strong>Volunteer Role:</strong> ${volunteerRole}</p>
        `,
      });
    }

    // Save user to DB after email success
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
      year,
      subscribed: true,
    });

    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Unknown error", error);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
