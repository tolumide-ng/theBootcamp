import moment from 'moment';
import uuid from 'uuid';
import meetupModel from './meetupsModels';
import userModel from './usersModels';


class Question {
  constructor() {
    this.questions = [];
    this.votes = [];
  }

  askQuestion(data) {
    const theMeetup = meetupModel.getOne(data.meetupId);
    const theUser = userModel.findUser(data.userId);
    const theQuestion = {
      questionId: uuid.v4(),
      createdOn: moment.now(),
      createdBy: `${theUser.firstName} ${theUser.lastName}`,
      userId: theUser.userId,
      meetupId: theMeetup.meetupId,
      title: data.title,
      body: data.body,
      upvote: data.upvote,
      downvote: data.downvote,
    };
    this.questions.push(theQuestion);
    return theQuestion;
  }

  // get all questions related to the meetup
  getMeetupQuestions(meetupId) {
    return this.questions.filter(question => question.meetupId === meetupId);
  }

  // get all questions this users has answered
  getUserQuestions(userId) {
    return this.questions.filter(questions => questions.userId === userId);
  }

  // delete a question formely asked
  delete(questionId) {
    const theQuestion = this.forDel(questionId);
    const index = this.questions.indexOf(theQuestion);
    this.questions.splice(index, 1);
    return this.questions;
  }

  forDel(questionId) {
    return this.questions.find(question => question.questionId === questionId);
  }

  requestUpvote(data) {
    // does the question exist
    const theQuestion = this.forDel(data.questionId);
    // does the user exist
    const theUser = userModel.findUser(data.userId);
    // does the meetup exist
    const theMeetup = meetupModel.getOne(data.meetupId);
    const userExist = this.votes.filter(user => user.userId === data.userId);
    // const meetupExist = this.votes.filter(meetup => meetup.meetupId === data.meetupId);
    // const questionExist = this.votes.filter(question => question.questionId === data.questionId);

    const userExistQuestion = userExist.find(question => question.questionId === data.questionId);

    if (theQuestion && theMeetup && theUser) {
      /* Check if the user/meetup/question exist in the votes array */

      if (userExist) {
        // if there is a user in the votes array with this userId then...
        // has he interacted with this question?
        if (userExistQuestion.type === 'upvote' && (userExistQuestion.meetupId === data.meetupId)) {
          // does the user exist in the user array of usersModels and has already upvoted ?
          return;
        }
        if (userExistQuestion.type === 'downvote' && (userExistQuestion.meetupId === data.meetupId)) {
          theQuestion.downvote -= 1;
          theQuestion.upvote += 1;
        }
      }
      // User exists in reallife but has not voted this question
      const guy = {
        userId: data.userId,
        questionId: data.questionId,
        meetupId: data.meetupId,
        type: 'upvote',
      };
      this.votes.push(guy);
      theQuestion.upvote += 1;
    }
  }

  requestDownvote(data) {
    // does the question exist
    const theQuestion = this.forDel(data.questionId);
    // does the user exist
    const theUser = userModel.findUser(data.userId);
    // does the meetup exist
    const theMeetup = meetupModel.getOne(data.meetupId);

    const userExist = this.votes.filter(user => user.userId === data.userId);
    // const meetupExist = this.votes.filter(meetup => meetup.meetupId === data.meetupId);
    // const questionExist = this.votes.filter(question => question.questionId === data.questionId);
    const userExistQuestion = userExist.find(question => question.questionId === data.questionId);


    if (theQuestion && theMeetup && theUser) {
      /* Check if the user/meetup/question exist in the votes array */

      if (userExist) {
        // if there is a user in the votes array with this userId then...
        // has he userExist(found to exist) interacted with this question?

        if (userExistQuestion.type === 'downvote' && (userExistQuestion.meetupId === data.meetupId)) {
          // does the user exist in the user array of usersModels and has already upvoted ?
          return;
        }
        if (userExistQuestion.vote === 'upvote' && (userExistQuestion.meetupId === data.meetupId)) {
          theQuestion.upvote -= 1;
          theQuestion.downvote += 1;
        }
      }
      // User exists in reallife but has not voted this question
      const guy = {
        userId: data.userId,
        questionId: data.questionId,
        meetupId: data.meetupId,
        type: 'upvote',
      };
      this.votes.push(guy);
      theQuestion.downvote += 1;
    }
  }
}

export default new Question();
