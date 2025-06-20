import dotenv from 'dotenv'
import app from './app'
import connectDB from './config/db'



connectDB()
const port = process.env.PORT || 3001

//  Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port} `)
})