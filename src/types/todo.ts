import { Document } from "mongoose"
declare global {
  namespace Express {
    interface Request {
      user?: IUser & Document
      userId?: string
    }
  }
}
export type CustomJwtPayload = {
  userId: string
 phone: number
}


export interface IUser extends Document {
    _id: string,
    name: string,
    phone: number,
    password: string
}

export interface Itodo extends Document{
    text: string,
    completed: boolean,
    
}