import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';
import { Book } from './controllers/bookController';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('DB connection successful! 🟢'));

const bookSchema = new mongoose.Schema<Book>({
  title: {
    type: String,
    required: [true, 'A book must have a title'],
    unique: true,
  },
  description: {
    type: String,
    default: 'test description',
  },
  pages: {
    type: Number,
    required: [true, 'A book must have a number of pages'],
  },
});

const Book = mongoose.model<Book>('Book', bookSchema);

const testBook = new Book({
  title: 'test book 2',
  pages: 59,
});

testBook
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀...`);
});
