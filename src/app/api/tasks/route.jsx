import Task from "@/models/Task";
import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";

export async function GET(){
    conectarDB()
    const tasks = await Task.find()
    return NextResponse.json({tasks})
}

export async function POST(request){
    try {
        const data = await request.json()
        const newTask = new Task(data)
        const savedTask = await newTask.save()
        return NextResponse.json(savedTask)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

