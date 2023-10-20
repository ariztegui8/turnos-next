import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Ingrese su Nombre" },
                password: { label: "Password", type: "password", placeholder: "Ingrese su password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", fullname: "Jorge", email: "jorge08@gmail.com" }
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ]
})

export { handler as GET, handler as POST }