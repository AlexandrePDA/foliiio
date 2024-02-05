import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    console.log({ user });
  } catch (e) {
    console.log(e);
  }
  return NextResponse.json({ message: "succes " });
}
