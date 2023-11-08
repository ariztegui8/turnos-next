import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'El password es requerido'],
        select: false,
    },
    name: {
        type: String,
        required: [true, 'El name es requerido'],
        minLength: [3, 'El name tiene que ser mayor a 3 caracteres'],
        maxLength: [50, 'El name no puede superar 50 caracteres'],
    }
    
})

export default models?.User || model('User', userSchema)