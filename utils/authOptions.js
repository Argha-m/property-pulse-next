import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    //Invoked on successful sign in
    async signIn({ profile }) {
      //1. Connect ot Database
      await connectDB();

      //2. Check if user already exists
      const userExists = await User.findOne({ email: profile.email });

      //3. If not, create a new user
      if (!userExists) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      //4. Return true to proceed with sign in
      return true;
    },
    //Session callback is invoked whenever a session is checked
    async session({ session }) {
      //1. Get user from database
      const user = await User.findOne({ email: session.user.email });

      //2. Assign user id to session
      session.user.id = user._id.toString();

      //3. Return session
      return session;
    },
  },
};
