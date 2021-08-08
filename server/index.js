import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import indexRoute from './routes/index.js';
const app = express();
dotenv.config();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use('/', indexRoute);
app.get('/', (req, res) => {
  res.send('Hello and Welcome');
});
const PORT = process.env.PORT || 5000;
// Mongodb connection
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`))
  )
  .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);
