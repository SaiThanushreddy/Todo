import { connectMongoDB } from "@/lib/db";
import User from "@/model/User"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials): Promise<any>{
        const { email, password }:any = credentials;

        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          if(user.email === email && user.password === password) {
            return user;
          }else{
            return null;
          }

        console.log(credentials);

         

          
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };