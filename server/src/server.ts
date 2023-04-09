import dotenv from 'dotenv'
dotenv.config()
console.info(process.env.NODE_ENV)

import app from './app'
app