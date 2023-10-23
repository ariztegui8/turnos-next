import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import conectarDB from "@/utils/conectarDB";
import User from "@/models/User";
import bcrypt from 'bcryptjs'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Ingrese su Nombre" },
                password: { label: "Password", type: "password", placeholder: "Ingrese su password" }
            },
            async authorize(credentials, req) {
                await conectarDB()
                console.log(credentials);

                const userFound = await User.findOne({email: credentials?.email}).select("+password")
                if(!userFound) throw new Error('Invalid credentials')

                const passwordMatch = await bcrypt.compare(credentials.password, userFound.password)
                if(!passwordMatch) throw new Error('Invalid credentials')

                console.log(userFound);
                return userFound
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // redirectUri: '/dashboard',
        }),
    ],

    callbacks: {
        jwt({account, token, user, profile, session}){
            if(user) token.user = user;
            return token;
        },
        session({session, token}){
           session.user = token.user
            return session
        }
    },
    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST }