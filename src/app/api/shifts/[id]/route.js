import Shift from "@/models/Shift";
import conectarDB from "@/utils/conectarDB";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    try {
        await conectarDB()
        const shiftFound = await Shift.findById(params.id)
        if (!shiftFound)
            return NextResponse.json({
                message: "Shift not found",
            }, {
                status: 404
            }
            )
        return NextResponse.json({ shiftFound })
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function PUT(request, { params }) {
    try {
        const data = await request.json()
        const shiftUpdated = await Shift.findByIdAndUpdate(params.id, data, {
            new: true
        })
        return NextResponse.json({ shiftUpdated })
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}

export async function DELETE(request, { params }) {
    try {
        const shiftDeleted = await Shift.findByIdAndDelete(params.id)
        if (!shiftDeleted)
            return NextResponse.json({
                message: 'Shift not found',
            }, {
                status: 404
            })
        return NextResponse.json({ shiftDeleted })
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}