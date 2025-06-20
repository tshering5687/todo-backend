// controllers/authController.ts
import { Request, Response } from 'express'
import User from '../models/userModel'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register User with validation
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, phone, password } = req.body

    // Input validation
    if (!name || name.length < 4) {
       res.status(400).json({ error: 'Name must be at least 4 characters long' })
        return 
    }

    if (!phone || !/^\d{8,11}$/.test(phone)) {
       res.status(400).json({ error: 'Phone must be 8 to 11 digits' })
        return 
    }

    if (!password || password.length < 8 || password.length > 20) {
       res.status(400).json({ error: 'Password must be between 8 and 20 characters' })
        return 
    }

    try {
        const existingUser = await User.findOne({ phone })
        if (existingUser) {
           res.status(409).json({ error: 'User already exists' })
             return
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({ name, phone, password: hashedPassword })
        await user.save()

        res.status(201).json({ message: 'User registered successfully' })
    } catch (error) {
        res.status(400).json ({message: 'Registration error:', 
        error: ( error as Error ).message })
    }
}


// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { phone, password } = req.body

    if (!phone || !password) {
      res.status(400).json({ error: 'Phone and password are required' })
        return 
    }

    try {
        const user = await User.findOne({ phone })
        if (!user) {
           res.status(401).json({ error: 'Invalid credentials' })
            return 
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(401).json({ error: 'Invalid credentials' })
             return
        }

        const token = jwt.sign(
            { userId: user._id, phone: user.phone },
            process.env.JWT_SECRET || 'defaultsecret',
            { expiresIn: '7d' }
        )

        res.status(200).json({ message: 'Logged in successfully', token })
    } catch (error) {
        res.status(400).json ({message: 'Login failed:', 
        error: ( error as Error ).message })
    }
}
// to get user info from token
export const getProfile= async(req:Request,res:Response): Promise<void> =>{
        try{
        if(!req.user){
            res.status(401).json({success: false, message:'Unauthorized'})
            return
        }
        const userObj= req.user.toObject?.()?? req.user
        const {passwordHash,...safeUser} =userObj

        res.status(200).json({success:true, data:safeUser,message: `Welcome back,${safeUser.name}`})
    }catch (error){
        
        console.error('Error in user auth route:',error)
        res.status(500)
        .json({message: 'Error fetching user',error:(error as Error).message})
    }
}