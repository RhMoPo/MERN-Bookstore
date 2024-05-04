import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

//middleware for parsing req body
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Hello World");
});

// route for saving a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Please fill all required fields" });
    }
      const newBook = {
          title: req.body.title,
          author: req.body.author,
          publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
      return res.status(201).send(book)
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for getting all books from db

app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    
    }
});

// route for getting a single book from db
app.get('/books/:id', async (req, res) => {
    try {

        const { id } = req.params
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    
    }
});

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
