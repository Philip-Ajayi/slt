import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import nodemailer from "nodemailer";

const FROM_EMAIL = process.env.FROM_EMAIL!;
const ZOHO_PASSWORD = process.env.ZOHO_PASSWORD!;
const BATCH_SIZE = 100; // 100 users per email
const BATCH_NUMBER = 2; // 0 = 1–100, 1 = 101–200, 2 = 201–300 👈

export async function GET() {
  try {
    await dbConnect();

    // Fetch users for batch 201–300
    const users = await User.find({ year: 2025 })
      .skip(BATCH_NUMBER * BATCH_SIZE)
      .limit(BATCH_SIZE);

    if (users.length === 0) {
      return NextResponse.json({
        message: `No users found for batch #${BATCH_NUMBER + 1} (users ${
          BATCH_NUMBER * BATCH_SIZE + 1
        }–${BATCH_NUMBER * BATCH_SIZE + BATCH_SIZE}).`,
      });
    }

    // Create mail transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: FROM_EMAIL,
        pass: ZOHO_PASSWORD,
      },
    });

    const html = `
      <div style="font-family: 'Segoe UI', sans-serif;">
        <p>Hey there! 👋</p>
        <p>
          Thank you for being part of <strong>Salt and Light 2025</strong>!
          We hope you were blessed and transformed.
        </p>
        <p>
          📸 Check out the pictures from all sessions:<br/>
          <a href="https://drive.google.com/drive/folders/1wRjzPYXJJR7vku6UDNvyJFRW0vh91hkH">
            View on Google Drive
          </a>
        </p>
        <p><strong>Shaa!</strong></p>
      </div>
    `;

    const bccList = users.map((u) => u.email).join(",");

    try {
      await transporter.sendMail({
        from: `"Salt & Light 2025" <${FROM_EMAIL}>`,
        to: FROM_EMAIL, // required for Zoho
        bcc: bccList,
        subject: "Thank You for Being Part of Salt and Light 2025 ✨",
        html,
      });

      console.log(`✅ Sent batch #${BATCH_NUMBER + 1} (${users.length} users)`);
      return NextResponse.json({
        message: `Successfully sent batch #${BATCH_NUMBER + 1} (${users.length} recipients).`,
      });
    } catch (err: any) {
      console.error(`❌ Error sending batch #${BATCH_NUMBER + 1}:`, err.message);
      return NextResponse.json(
        { error: err.message, batch: BATCH_NUMBER + 1 },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
