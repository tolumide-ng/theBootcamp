import moment from 'moment';
import uuid from 'uuid';

class Meetup {
  constructor() {
    this.meetups = [];
    this.attending = [];
  }

  create(data) {
    const meetup = {
      meetupId: uuid.v4(),
      createdOn: moment.now(),
      location: data.location,
      images: data.images || '',
      topic: data.topic,
      happeningOn: data.happeningOn,
      tags: data.tags,
    };
    this.meetups.push(meetup);
    return meetup;
  }

  // a small checkbox/button an interested attendee clicks to display interest
  attend(data) {
    const attend = {
      meetupId: data.meetupId,
      userId: data.userId,
      meetup: data.meetup,
      user: data.user,
    };
    this.attending.push(attend);
    return attend;
  }

  // returns a list of the people attending the meetup
  findAttendingMeetup(meetupId) {
    return this.attending.filter(attends => attends.meetupId === meetupId);
  }

  // renders on the homepage, returns all the meetups
  getAll() {
    return this.meetups;
  }

  getOne(meetupId) {
    return this.meetups.find(meetup => meetup.meetupId === meetupId);
  }

  // returns all upcoming meetups
  upcomings() {
    const len = this.meetups.filter(meetup => new Date(meetup.happeningOn) > new Date());
    if(len.length === 0){
      return 0;
    }
    return len;
  }

  // Admin has the right to edit a meetup posted
  edit(data) {
    const theMeetup = this.getOne(data.meetupId);
    const index = this.meetups.indexOf(theMeetup);
    this.meetups[index].images = data.images || theMeetup.images;
    this.meetups[index].topic = data.topic || theMeetup.topic;
    this.meetups[index].location = data.location || theMeetup.location;
    this.meetups[index].happeningOn = data.happeningOn || theMeetup.happeningOn;
    this.meetups[index].tags = data.tags || theMeetup.tags;

    return theMeetup;
  }

  delete(meetupId) {
    const delMeetup = this.meetups.find(meetup => meetup.meetupId === meetupId);
    const index = this.meetups.indexOf(delMeetup);
    // Now splice it out
    this.meetups.splice(index, 1);
    return [];
  }
}

export default new Meetup();
