import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function sanitize(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  console.log("Received POST request"); // <-- Log entry point

  const { name, email, message } = await req.json();
  console.log("Parsed request body:", { name, email, message }); // <-- Log request data

  if (!name || !email || !message) {
    console.log("Missing fields detected");
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (!emailRegex.test(email)) {
    console.log("Invalid email format:", email);
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing email credentials in environment variables");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    console.log("Sending email...");
    await transporter.sendMail({
      from: `"Salt and Light Contact" <${process.env.EMAIL_USER}>`,
      to: "adeguntimileyin6@gmail.com",
      subject: "New Contact Form Message",
      html: `
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <p><strong>Message:</strong><br/>${sanitize(message).replace(
          /\n/g,
          "<br/>"
        )}</p>
      `,
    });
    console.log("Email sent successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}

