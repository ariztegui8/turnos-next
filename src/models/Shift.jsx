import { Schema, model, models } from "mongoose";

const shiftSchema = new Schema({
    fecha: {
        type: String,
        // required: [true, 'El titulo es requerido'],
        // unique: true,
        trim: true,
    },
    hora: {
        type: String,
        // required: [true, 'La descripcion es requerida'],
        trim: true,
    },
    profesional: {
        type: String,
        // required: [true, 'La descripcion es requerida'],
        trim: true,
    },
    
},{
    timestamps: true,
})

export default models?.Shift || model('Shift', shiftSchema)