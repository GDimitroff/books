import fs from 'fs';
import { Request, Response } from 'express';

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

const books: Book[] = JSON.parse(
  fs.readFileSync('./dev-data/data/books.json', 'utf8')
);

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
};

export const getBook = (req: Request, res: Response) => {
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

export const createBook = (req: Request, res: Response) => {
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

export const updateBook = (req: Request, res: Response) => {
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

export const deleteBook = (req: Request, res: Response) => {
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
