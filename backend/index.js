import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express();

//middleware for parsing req body
app.use(express.json());

//middleware for handling cors policy 
// 1: allow all origins with a default of cors(*)
app.use(cors())
//2: allow custom origins 
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))




app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World");
});

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
