import mongoose from 'mongoose';
import 'dotenv/config';
import app from './app';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('DB connection successful! 🟢'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀...`);
});
