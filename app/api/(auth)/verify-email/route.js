import { retriveUserById, updateVerifyStatus } from "@/models/userAuth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const verificationToken = searchParams.get("verifyToken") || null;
    const userId = searchParams.get("userId") || null;

    if (verificationToken === null || userId === null) {
      return NextResponse.json({
        success: false,
        message: "Error userId & verification token required!",
      });
    }

    const existingUser = await retriveUserById(userId);
    console.log(existingUser);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exits!",
        },
        { status: 409 }
      );
    }

    if (existingUser.verification_token === verificationToken) {
      await updateVerifyStatus(userId);
      return NextResponse.json({
        success: true,
        message: "Email verification successfull!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Incorrect verification token!",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Email verification Failed!",
    });
  } catch (error) {
    console.log(`Email verification error: ${error.message}`);
    return NextResponse.json({
      success: false,
      message: "Email verification failed!",
    });
  }
}
