import { connectMongoDB } from "@/lib/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { email, password } = await request.json();

    // Validate input (e.g., ensure email and password are not empty)

    const newUser = new User({ email, password });
    await newUser.save();
    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    console.error("Error registering user:", error);
    // Handle specific error types (e.g., validation errors, database errors)
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}