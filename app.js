import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './api/v1/routes/userRoutes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

userRoutes(app);

app.use((req, res, next) => {
  const error = new Error('Bad Request, Route not found');
  error.status = 400;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.statusCode || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
