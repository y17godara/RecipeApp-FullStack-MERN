import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://yash:yCzu0LYPllayrQSU@recipes.iav4fig.mongodb.net/recipes?retryWrites=true&w=majority"
  );

app.listen(3001, () =>
  console.log('SERVER STARTED AT PORT: 3001'),
);