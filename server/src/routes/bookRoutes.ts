import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.param('id', bookController.checkID);

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route('/:id')
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
