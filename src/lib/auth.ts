import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserByEmail } from "../actions/user";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token, user }) => {
      const userDetails = await getUserByEmail(token.email as string);
      if (userDetails && userDetails.data) {
        token.id = userDetails.data.id;
        token.name = userDetails.data.name;
        token.username = userDetails.data.username;
        token.email = userDetails.data.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.id) {
        session.user.userId = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },

  ...authConfig,
});
