import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { User } from "@/models/User";
import nodemailer from "nodemailer";
import QRCode from "qrcode";

async function generateUniqueId(year: number): Promise<string> {
  const prefix = `SLT${year}`;

  // Count how many users have registered this year
  const count = await User.countDocuments({ year });

  // Increment starting at 101
  const nextNumber = 101 + count;

  return `${prefix}${nextNumber}`;
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

    // Generate the unique ID for this user for the year
    const uniqueId = await generateUniqueId(year);

    // Construct the URL using the uniqueId instead of email
    const qrUrl = `https://slt.mivwordhouse.com/register/${uniqueId}`;

    // Generate QR code as a Buffer
    const qrBuffer = await QRCode.toBuffer(qrUrl, { width: 200 });

    // Setup Nodemailer transporter for Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send registration confirmation email with QR code and unique ID
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Salt and Light Conference ${year} Registration`,
      html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #6a0dad; border-radius: 8px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background-color: #6a0dad; padding: 15px 0; text-align: center;">
          <img src="https://slt.onrender.com/events/hero.png" alt="Salt and Light Conference" style="max-width: 100%; height: auto; border-radius: 4px;" />
        </div>
        
        <!-- Content -->
        <div style="padding: 30px 40px; color: #333;">
          <h3 style="color: #6a0dad; margin-top: 0;">Hi ${firstName},</h3>
          <p style="font-size: 16px;">Your registration for <strong>Salt and Light Conference ${year}</strong> is successful!</p>
          <p style="font-size: 16px;"><strong style="color: #6a0dad;">Your Unique ID:</strong> ${uniqueId}</p>
          <p style="font-size: 16px;">Please keep this ID safe. It will be used for identification at the event.</p>
          <p style="font-size: 16px;">Also, please scan or show the attached QR code for quick check-in.</p>
  
          <hr style="border: none; border-top: 2px solid #6a0dad; margin: 30px 0;" />
  
          <p style="font-size: 16px; margin-bottom: 5px;"><strong>Date:</strong> October 13, 2025 to October 17, 2025</p>
          <p style="font-size: 16px; margin-top: 0;"><strong>Venue:</strong> Behind Accord Building, Obadeyi Estate, Samonda, Ibadan</p>
  
          <div style="text-align: center; margin: 30px 0;">
            <img src="cid:qrCode" alt="QR Code" style="max-width: 160px; height: auto; border: 2px solid #6a0dad; border-radius: 8px;" />
          </div>
  
          <p style="font-size: 16px; color: #6a0dad; font-weight: 600;">Thank you!</p>
          
          <!-- Link outside footer -->
          <p style="text-align: center; margin-top: 40px; font-size: 14px; color: #6a0dad;">
            You can visit us at <a href="http://www.mivwordhouse.com" target="_blank" style="color: #4b0082; text-decoration: none; font-weight: bold;">http://www.mivwordhouse.com</a>
          </p>
        </div>
  
        <!-- Footer -->
        <footer style="background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666; padding: 15px 0; border-top: 1px solid #ddd;">
          &copy; MIV Word House
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

    // Notify Philip if user is a volunteer
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

    // Save user with uniqueId in the database
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
      uniqueId,
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
