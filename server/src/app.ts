import fs from 'fs';
import express from 'express';
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

app.get('/api/v1/books', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: {
      books,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ⚡...`);
});
