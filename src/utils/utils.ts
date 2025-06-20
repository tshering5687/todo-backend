// utils.ts
import bcrypt from 'bcryptjs'
import jwt, { SignOptions} from 'jsonwebtoken'
import { CustomJwtPayload, IUser } from '../types/todo';

import dotenv from 'dotenv'
dotenv.config() // Make sure this runs early if you're using process.env



const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '12h'


export const generateToken = (payload: CustomJwtPayload): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions)
}

export const verifyToken = (token: string): CustomJwtPayload => {
  return jwt.verify(token, JWT_SECRET) as CustomJwtPayload
}

// Hash password
export const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(plainPassword, salt)
}

// Compare password
export const comparePassword = async (
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

// Validate name (min length 4)
export const isValidName = (name: string): boolean => {
    return name.trim().length >= 4
}

// Validate phone (8 to 11 digits)
export const isValidPhone = (phone: string): boolean => {
    return /^\d{8,11}$/.test(phone)
}

// Validate password (8 to 20 chars)
export const isValidPassword = (password: string): boolean => {
    return password.length >= 8 && password.length <= 20
}