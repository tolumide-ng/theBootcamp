import meetupModel from '../models/meetupsModels';

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
    const count = allMeetups.length;
    // check if there are meetups at all
    if (count) {
      res.status(200).json({
        Meetups: count,
        data: allMeetups.map(meetup => ({
          meetup: meetup.meetupId,
          topic: meetup.topic,
          location: meetup.location,
          happeningOn: meetup.happeningOn,
          tags: meetup.tags,
        })),
      });
    }
    res.status(404).json({
      message: 'No content',
    });
  },

  allUpcomings(req, res) {
    const upcomingMeetups = meetupModel.upcomings();
    const theLength = upcomingMeetups.length;
    if (theLength <= 0) {
      return res.json(404).json({
        message: 'Not found!',
      });
    }
    return res.status(200).json({
      count: upcomingMeetups.length,
      data: upcomingMeetups.map(upcomingMeetup => ({
        meetupId: upcomingMeetup.meetupId,
        topic: upcomingMeetup.topic,
        location: upcomingMeetup.location,
        happeningOn: upcomingMeetup.happeningOn,
        tags: upcomingMeetup.tags,
      })),
    });
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
            meetup: people.meetup,
            user: people.user,
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