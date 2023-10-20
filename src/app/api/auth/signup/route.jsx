import User from "@/models/User";
import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const { fullname, email, password } = await request.json()
    console.log(fullname, email, password);
    if (!password || password.length < 6)
        return NextResponse.json({
            message: "El password debe ser mayor a 6 caracteres"
        }, { status: 400 })

   try {
    await conectarDB()
    const userFound = await User.findOne({ email })

    if (userFound)
        return NextResponse.json({
            message: "El email ya existe"
        }, { status: 400 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
        email,
        fullname,
        password: hashedPassword
    })
    const savedUser = await user.save()
    console.log(savedUser);



    return NextResponse.json(savedUser)
   } catch (error) {
    console.log(error);
    return NextResponse.error()
   }
}