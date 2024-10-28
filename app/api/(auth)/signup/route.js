import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { retriveUser, createUser } from "@/models/userAuth";
import userSchema from "@/joi-validations/data-valiadtion-signup";
import crypto from "crypto";
import { sendVerificationEmail } from "@/middlewares/send-email";

export async function POST(req) {
  try {
    const { username, name, email, password, gender } = await req.json();
    const defaultGender = gender || "other";

    // Validate request data using Joi
    const { error } = userSchema.validate({
      username,
      name,
      email,
      password,
      defaultGender,
    });

    if (error) {
      return NextResponse.json({ message: error.details[0].message });
    }

    //checking for existing user in the database
    const existingUser = await retriveUser(username, email);

    //Determine the appropriate response based on the existingUser result
    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json({ message: "Username already exists!" });
      } else if (existingUser.email === email) {
        return NextResponse.json({ message: "Email already exists!" });
      }
    }

    //Generate random verification token with crypto
    const emailVerifyToken = crypto.randomBytes(32).toString("hex");

    //Hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user in the database
    const newUserRes = await createUser(
      username,
      name,
      email,
      hashedPassword,
      defaultGender,
      emailVerifyToken
    );

    const userId = newUserRes.insertId;

    const emailVerifyUrl = `http://localhost:3000/api/verify-email?verifyToken=${emailVerifyToken}&userId=${userId}`;

    //send the verification email to given user email
    await sendVerificationEmail(email, "Verify your email", emailVerifyUrl);

    return NextResponse.json({
      message: "User created! Please check your email to verify your account.",
      userId: userId,
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return NextResponse.json({
      error: "An error occurred while creating the user.",
    });
  }
}
