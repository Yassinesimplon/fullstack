//👇🏻index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import userRoutes from './routes/PlaceRoutes.js'
import placeRouter from "./routes/PlaceRoutes.js";
import userRouter from "./routes/userRoutes.js"
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use('api/',userRoutes);
app.use('/api/place',placeRouter)
app.use('/api/user',userRouter)


mongoose.connect('mongodb+srv://yassinehasnaouifabrikademy:yassine@cluster0.udtwdab.mongodb.net/todo?retryWrites=true&w=majority').then(() => {
    app.listen( PORT, () => {
        console.log("Server is running on port " + PORT);
    });
    
}).catch(err => console.error(err))

