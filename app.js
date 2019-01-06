import express from 'express';
import bodyParser from 'body-parser';
import meetupsRoutes from './v1/routes/meetupsRoutes'
import userRoutes from './v1/routes/usersRoutes';
import questionsRoutes from './v1/routes/questionsRoutes'


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


meetupsRoutes(app);
userRoutes(app);
questionsRoutes(app);


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
