import questionControllers from '../controllers/questions';

const routes = (app) => {
  app.route('/v1/questions')
    .post(questionControllers.createQuestion);

  app.route('/v1/questions/:questionId/upvote')
    .patch(questionControllers.upvote);

  app.route('/v1/questions/:questionId/downvote')
    .patch(questionControllers.downvote);

  app.route('/v1/questions/:questionId/delete')
    .delete(questionControllers.delete);

  app.route('/v1/questions/:meetupId')
    .get(questionControllers.getAllQuestions);
};

export default routes;