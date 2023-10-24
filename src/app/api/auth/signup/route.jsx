import User from "@/models/User";
import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST(request) {
    const { name, email, password } = await request.json()
    // console.log(name, email, password);
    if (!name || !email || !password) {
        return NextResponse.json({
            message: "Todos los campos son requeridos"
        }, { status: 400 });
    }

    if (name.length < 3) {
        return NextResponse.json({
            message: "El nombre debe ser mayor a 3 caracteres"
        }, { status: 400 });
    }
    
    if (password.length < 6) {
        return NextResponse.json({
            message: "La contraseña debe ser mayor a 6 caracteres"
        }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        return NextResponse.json({
            message: "El formato del email no es válido"
        }, { status: 400 });
    }

   try {
    await conectarDB()
    const userFound = await User.findOne({ email })

    if (userFound)
        return NextResponse.json({
            message: "El email ya existe"
        }, { status: 409 })

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({
        email,
        name,
        password: hashedPassword
    })
    const savedUser = await user.save()
    console.log(savedUser);



    return NextResponse.json({
        name: savedUser.name,
        email: savedUser.email,
        _id: savedUser._id
    })
   } catch (error) {
    console.log(error);
    return NextResponse.error()
   }
}