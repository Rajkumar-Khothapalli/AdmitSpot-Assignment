import { NextResponse } from "next/server";
import { retriveUser, retriveUserById } from "@/models/userAuth";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const jwt = require("jsonwebtoken");

export async function POST(req) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    // Query to check if the user exists
    const retrievedUser = await retriveUser(identifier, identifier);

    if (retrievedUser) {
      //Add the below lines if not testing because need acutal email and its need to be verified
      // if (retrievedUser.is_verified === 0) {
      //   return NextResponse.json({
      //     message: "Please verify your account!",
      //     status: 401,
      //   });
      // }

      // Compare password with the hashed password
      const isPasswordMatched = await bcrypt.compare(
        password,
        retrievedUser.password
      );

      // If password matches, return the JWT token
      if (isPasswordMatched) {
        const payload = {
          username: retrievedUser.username,
          email: retrievedUser.email,
        };
        const jwtToken = jwt.sign(payload, process.env.MY_SECRET_CODE);
        return NextResponse.json({
          message: "Login Success!",
          jwtToken,
          status: 200,
        });
      } else {
        return NextResponse.json({
          message: "Incorrect password!",
          status: 401,
        });
      }
    } else {
      return NextResponse.json({ message: "User not found!", status: 404 });
    }
  } catch (error) {
    console.log(`Login Error: ${error.message}`);
    return NextResponse.json({ message: "Something went wrong!", status: 500 });
  }
}
