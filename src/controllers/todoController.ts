import { Request, Response } from 'express'
import Todo from '../models/todoModel'

// Create a new Todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body

    if (!text || typeof text !== 'string') {
      res.status(400).json({ message: 'Text is required and must be a string.' })
      return
    }

    const newTodo = new Todo({ text })
    const savedTodo = await newTodo.save()
    res.status(201).json(savedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}

// Get all Todos
export const getTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}

// Get a single Todo by ID
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}

// Update a Todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, completed } = req.body
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true, runValidators: true }
    )

    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }

    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}

// Delete a Todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

    if (!deletedTodo) {
      res.status(404).json({ message: 'Todo not found' })
      return
    }

    res.status(200).json({ message: 'Todo deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}