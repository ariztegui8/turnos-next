import { connectDB } from "@/utils/mongoose";

const { NextResponse } = require("next/server");



export function GET(){
    connectDB()
    return NextResponse.json({
        message: 'obteniendo tareas...'
    })
}

// export function POST(){
//     return NextResponse.json({
//         message: 'creando tarea...'
//     })
// }