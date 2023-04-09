import mongoose from "mongoose";


const dbConnect = (mongoUrl: string) => {
    return mongoose.connect(mongoUrl)
}

export default dbConnect