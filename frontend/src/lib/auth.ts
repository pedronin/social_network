import type { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { SERVER_URL } from "@/env";

export const authConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        username: {
          type: "text",
        },
        email: {
          type: "text",
        },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
            method: "POST",
            body: JSON.stringify(credentials),
          });

          return response.json();
        } catch (error) {
          return Promise.reject({
            message: "Register error, not valid data!",
          });
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};
