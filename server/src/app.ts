import fs from 'fs';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';

export interface Book {
  id: number;
  isbn: number;
  title: string;
  subtitle: string;
  author: string;
  published: Date;
  publisher: string;
  pages: number;
  description: string;
  website: string;
}

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const books: Book[] = JSON.parse(
  fs.readFileSync('./dev-data/data/books.json', 'utf8')
);

const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
};

const getBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      book,
    },
  });
};

const createBook = (req: Request, res: Response) => {
  const newId = books[books.length - 1].id + 1;
  const newBook: Book = Object.assign({ id: newId }, req.body);
  books.push(newBook);

  fs.writeFile(
    './dev-data/data/books.json',
    JSON.stringify(books, null, 2),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          book: newBook,
        },
      });
    }
  );
};

const updateBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedBook = { ...book, ...req.body };
  const updatedBooks = books.map((book) => {
    return book.id === updatedBook.id ? updatedBook : book;
  });

  fs.writeFile(
    './dev-data/data/books.json',
    JSON.stringify(updatedBooks, null, 2),
    (err) => {
      res.status(200).send({
        status: 'success',
        data: {
          book: updatedBook,
        },
      });
    }
  );
};

const deleteBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  if (!book) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedBooks = books.filter((b) => b.id !== book.id);

  fs.writeFile(
    './dev-data/data/books.json',
    JSON.stringify(updatedBooks, null, 2),
    (err) => {
      res.status(204).send({
        status: 'success',
        data: null,
      });
    }
  );
};

app.route('/api/v1/books').get(getAllBooks).post(createBook);

app
  .route('/api/v1/books/:id')
  .get(getBook)
  .patch(updateBook)
  .delete(deleteBook);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ⚡...`);
});
