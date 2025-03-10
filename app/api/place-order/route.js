import { connectDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqData = await req.json();
  console.log("req data:", reqData);
  try {
    await connectDB();
    console.log("place order hitted");
    return NextResponse.json(
      { message: "successfully hitted create order route!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
