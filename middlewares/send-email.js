import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  userEmail,
  subject,
  verificationUrl
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL,
      to: userEmail,
      subject,
      html: `<h1>Please verify your Email</h1><p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(`Email verification failed: ${error.message}`);
    NextResponse.json({
      success: false,
      message: `Something went wrong: ${error.message}`,
    });
  }
}
