import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.checkBody, bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
