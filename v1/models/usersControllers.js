import users from '../models/users';

const User = {
  /* we need to confirm that the email does
  previosly exist */
  signUp(req, res) {
    const data = req.body;
    const theEmail = data.email;
    const theConfirm = users.confirm(theEmail);
    if (data.firstName && data.lastName && data.email
      && data.phoneNumber && data.re_password) {
      if (data.re_password === data.password) {
        if (!theConfirm) {
          const theUser = users.signup(data);
          return res.status(201).json({
            firstName: theUser.firstName,
            lastName: theUser.lastName,
            email: theUser.email,
            phoneNumber: theUser.phoneNumber,
          });
        }
        return res.status(409).json({
          message: 'Email already exist',
        });
      }
      return res.status(401).json({
        message: 'Password does not match, try again!',
      });
    }
    return res.status(400).json({
      message: 'Bad Syntax: All fields are required',
    });
  },

  login(req, res) {
    const data = req.body;
    /* const { password, email } = password; */
    const password = data.password;
    const email = data.email;
    const checkEmail = users.users.find(user => user.email === email);
    if (!checkEmail) {
      return res.status(401).json({
        message: 'Auth failed: Password/Email does not exist',
      });
    }
    const available = users.login(password);
    if (available) {
      return res.status(200).json({
        firstName: available.firstName,
        lastName: available.lastName,
        email: available.email,
        phoneNumber: available.phoneNumber,
      });
    }
    return res.status(401).json({
      message: 'Auth failed',
    });
  },

  userInfo(req, res) {
    const data = req.body;
    const exist = users.findUser(data);
    if (exist) {
      const info = users.userInfor(exist.userId);
      res.status(200).json({
        firstName: info.firstName,
        lastName: info.lastName,
        email: info.email,
        phoneNumber: info.phoneNumber,
      });
    }
    res.status(404).json({
      message: 'User Not Found',
    });
  },
};

export default User;
