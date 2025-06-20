import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL as string)
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
    } catch (error) {
        console.error('❌ MongoDB connection error:', error)
        process.exit(1) // Exit process with failure
    }
}

export default connectDB