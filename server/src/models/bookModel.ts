import mongoose, { Schema } from 'mongoose';

// TODO: double check this
export interface IBook {
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

const BookSchema = new Schema<IBook>({
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

export default mongoose.model<IBook>('Book', BookSchema);
