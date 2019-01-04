//Import dependencies
import moment from 'moment';
import uuid from 'uuid';
import meetupModel from '../models/meetupsModels';


class User {
  constructor() {
    this.users = [];
  }

  signup(data) {
    const newUser = {
      userId: uuid.v4(),
      registeredId: moment.now(),
      firstName: data.firstName,
      lastName: data.lastName,
      otherName: data.otherName || '',
      userName: data.userName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      isAdmin: data.isAdmin,
      password: data.password,
      image: data.image || '',
    };
    this.users.push(newUser);
    return newUser;
  }

  attendMeetup(data) {
    const confirmUser = this.findUser(data.userId);
    const confirmUserAttendng = meetupModel.attending.find(user => user.userId === data.userId);
    if (confirmUser && !confirmUserAttendng) {
      const attendee = {
        userId: data.userId,
        meetupId: data.meetupId,
        meetup: data.meetup,
        user: data.user,
      };
      meetupModel.attending.push(attendee);
    } else if (confirmUser && confirmUserAttendng) {
      return 'You already signed up for this event';
    }
    return 'Incorrect data supplied';
  }

  unAttendMeetup(data) {
    const confirmUser = this.findUser(data.userId);
    const confirmUserAttendng = meetupModel.attending.find(user => user.userId === data.userId);
    if (confirmUser && confirmUserAttendng) {
      const index = meetupModel.attending.indexOf(confirmUserAttendng);
      meetupModel.attending.splice(index, 1);
    }
  }

  findUser(userId) {
    return this.users.find(user => user.userId === userId);
  }

  confirm(email) {
    return this.users.find(user => user.email === email);
  }

  login(password) {
    return this.users.find(user => user.password === password);
  }

  deleteUser(userId) {
    const theUser = this.findUser(userId);
    const index = this.users.indexOf(theUser);
    this.users.splice(index, 1);
    return {};
  }

  // to be rendered on the profile page
  userInfor(userId) {
    const theUser = this.findUser(userId);
    return theUser;
  }
}

export default new User();
