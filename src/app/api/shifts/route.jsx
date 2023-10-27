import Shift from "@/models/Shift";
import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";
import { useSession } from 'next-auth/react'

export async function GET(){
    conectarDB()
    const shift = await Shift.find()
    return NextResponse.json({shift})
}

export async function POST(request){
    try {
        const data = await request.json()
        const newShift = new Shift(data)
        const savedShift = await newShift.save()
        return NextResponse.json(savedShift)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

// export async function POST(request){
//     try {
//         conectarDB();
//         const { data: session, status } = useSession()
//         if (!session || status !== "authenticated") {
//             return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
//         }

//         const data = await request.json();
//         const user = session.user;

//         // Asocia el usuarioId con el turno al crearlo
//         const newShift = new Shift({
//             ...data,
//             usuarioId: user.id,
//         });

//         const savedShift = await newShift.save();
//         return NextResponse.json(savedShift);
//     } catch (error) {
//         return NextResponse.json(error.message, { status: 400 });
//     }
// }

