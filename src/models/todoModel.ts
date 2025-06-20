import mongoose, { Schema, Document } from 'mongoose'

// TypeScript Interface
export interface ITodo extends Document {
  text: string
  completed: boolean
}

// Mongoose Schema
const todoSchema: Schema = new Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Mongoose Model
const Todo = mongoose.model<ITodo>('Todo', todoSchema)

export default Todo