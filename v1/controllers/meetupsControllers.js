import meetupModel from '../models/meetupsModels';
import usersModel from './../models/usersModels';

const Meetups = {
  createMeetup(req, res) {
    // all parameters are required
    const data = req.body;
    const dateHappening = (new Date(data.happeningOn) > new Date());
    if (!data.topic && !data.location && !data.tags
            && !data.happeningOn && !dateHappening) {
      return res.status(422).json({
        message: 'All fields are required',
      });
    }
    const createdMeetup = meetupModel.create(data);
    return res.status(201).json({
      topic: createdMeetup.topic,
      location: createdMeetup.location,
      happeningOn: createdMeetup.happeningOn,
      tags: createdMeetup.tags,
      createdOn: createdMeetup.createdOn,
    });
  },

  rsvp(req, res) {
    const params = meetupModel.getOne(req.params.meetupId);
    const data = req.body;
    const userId = usersModel.findUser(data.userId);
    const status = 'yes'||'no'||'maybe';
    if(params && userId && status) {
      const attend = meetupModel.attend(data);
      attend;
      res.status(201).json({
        status: 201,
        data: [{
          meetup: attend.meetupId,
          topic: attend.topic,
          status: attend.response,
        }]
      });
    }
    res.status(422).json({
      message: "Unprocessable Entity: Confirm the supplied information"
    })
  },

  findOne(req, res) {
    const params = req.params.meetupId;
    const theMeetup = meetupModel.getOne(params);
    if (!theMeetup) {
      return res.status(404).json({
        message: 'Meetup Not Found',
      });
    }
    return res.status(200).json({
      meetup: theMeetup.meetupId,
      createdOn: theMeetup.createdOn,
      topic: theMeetup.topic,
      location: theMeetup.location,
      happeningOn: theMeetup.happeningOn,
      tags: theMeetup.tags,
    });
  },

  findAll(req, res) {
    const allMeetups = meetupModel.getAll();
    if(allMeetups.length) {
      res.status(200).json({
        Meetups: allMeetups.length,
        data: allMeetups.map(meetup => ({
          meetup: meetup.meetupId,
          topic: meetup.topic,
          location: meetup.location,
          happeningOn: meetup.happeningOn,
          tags: meetup.tags,
        })),
      })
    }
    return res.status(404).json({
      message: 'Meetups not found'
    })
  },

  allUpcomings(req, res) {
    const upcomingMeetups = meetupModel.upcomings();
    if(upcomingMeetups.length) {
      return res.status(200).json({
        count: upcomingMeetups.length,
        data: upcomingMeetups.map(upcomingMeetup => ({
          meetupId: upcomingMeetup.meetupId,
          topic: upcomingMeetup.topic,
          location: upcomingMeetup.location,
          happeningOn: upcomingMeetup.happeningOn,
          tags: upcomingMeetup.tags,
        })),
      })
    }
    return res.status(404).json({
      message: 'No meetups found'
    })
  },

  deleteMeetup(req, res) {
    // Is this a real meetup?
    const confirm = meetupModel.getOne(req.body.meetupId);
    if (confirm) {
      meetupModel.delete(req.body.meetupId);
      res.status(200).json({
        message: 'Deleted',
      });
    }
    return res.status(404).json({
      message: 'Meetup Not Found',
    });
  },

  edit(res, req) {
    const confirm = meetupModel.getOne(req.body.meetupId);
    if (!confirm) {
      return res.status(404).json({
        message: 'Meetup not found',
      });
    }
    meetupModel.edit(req.body);
    return res.status(200).json({
      message: 'Update Succesful',
    });
  },

  findAttending(req, res) {
    // confirm if meetup exists in meetups
    // confirm if meetup exists in attending
    // return length and userid of attendees

    const meetupExist = meetupModel.getOne(req.params.meetupId);
    if (meetupExist) {
      const confirm = meetupModel.attending.find(meetup => meetup.meetupId === req.params.meetupId);
      if (confirm) {
        return res.status(200).json({
          count: confirm.length,
          data: confirm.map(people => ({
            meetupId: people.meetupId,
            userId: people.userId,
            title: people.title,
            body: people.body,
          })),
        });
      }
      return res.status(404).json({
        message: 'No registered attendants for this meetup',
      });
    }
    return res.status(404).json({
      message: 'Meetup does not exist',
    });
  },
};

export default Meetups;