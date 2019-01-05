import users from '../controllers/usersControllers';

const routes = (app) => {
  app.route('/v1/users/profile')
    .get(users.userInfo);

  app.route('/v1/users/signup')
    .post(users.signUp);

  app.route('/v1/users/login')
    .post(users.login);
};

export default routes;