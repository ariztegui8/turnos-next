import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'

const handlerGoogle = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })]
})

export {handlerGoogle as GET, handlerGoogle as POST}