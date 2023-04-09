import { CorsOptions } from "cors"
import allowedOrigins from "./allowedOrigins"


const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}


// const corsOptions = {
//     origin: (origin: string, callback: Function) => {
//         if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
//          callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200
// }

export default corsOptions