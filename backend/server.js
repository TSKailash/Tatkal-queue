import app from "./src/app.js";
import dotenv from 'dotenv'
dotenv.config()

const PORT=process.env.PORT     
// console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.listen(PORT, ()=>{
    console.log("App is running")
})