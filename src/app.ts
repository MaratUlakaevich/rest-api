import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(bookRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
