import { Router } from 'express'
import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo} from '../controllers/todoController'
import { authenticate } from '../middleware/authMiddleware'

const router = Router()

// Create a new todo
router.post('/',authenticate, createTodo)

// Get all todo
router.get('/',authenticate, getTodos)

// Get a specific todo by ID
router.get('/:id',authenticate, getTodoById)

// Update a todo by ID
router.put('/:id',authenticate, updateTodo)

// Delete a todo by ID
router.delete('/:id',authenticate, deleteTodo)

export default router