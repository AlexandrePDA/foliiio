import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const response = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        const user = response;

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        );

        console.log({ passwordCorrect });

        if (passwordCorrect) {
          return {
            id: user.id,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
