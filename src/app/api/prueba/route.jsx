import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";

export function GET(){
    conectarDB()
    return NextResponse.json({
        message: 'hello world!',
    })
}