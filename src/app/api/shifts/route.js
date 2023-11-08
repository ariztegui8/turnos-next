import Shift from "@/models/Shift";
import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";

export async function GET(){
    await conectarDB()
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

