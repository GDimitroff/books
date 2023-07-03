import { Request, Response, NextFunction } from 'express';
import { IBook } from '../models/bookModel';

const isBook = (book: IBook): book is IBook => {
  return (
    typeof book.isbn === 'number' &&
    typeof book.title === 'string' &&
    typeof book.subtitle === 'string' &&
    typeof book.author === 'string' &&
    typeof book.published === 'string' &&
    typeof book.publisher === 'string' &&
    typeof book.pages === 'number' &&
    typeof book.description === 'string' &&
    typeof book.website === 'string'
  );
};

export const checkBody = (req: Request, res: Response, next: NextFunction) => {
  const book: IBook = req.body;

  if (!isBook(book)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid book data',
    });
  }

  next();
};

export const getAllBooks = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    // results: books.length,
    // data: {
    //   books,
    // },
  });
};

export const getBook = (req: Request, res: Response) => {
  // const id = Number(req.params.id);
  // const book = books.find((book) => book.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     book,
  //   },
  // });
};

export const createBook = (req: Request, res: Response) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   book: newBook,
    // },
  });
};

export const updateBook = (req: Request, res: Response) => {
  res.status(201).json({
    status: 'success',
    data: {
      book: '<Updated book here>',
    },
  });
};

export const deleteBook = (req: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
