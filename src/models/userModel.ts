// models/userModel.ts
import mongoose, { Document, Schema } from 'mongoose'
import { IUser } from '../types/todo'

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        minlength: 4,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 11,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
    },
}, {
    timestamps: true,
})

const User = mongoose.model<IUser>('User', userSchema)
export default User