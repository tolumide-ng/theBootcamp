import meetups from '../controllers/meetupsControllers';

const routes = (app) => {
  app.route('/v1/meetups')
    .get(meetups.findAll);

  app.route('/v1/meetups')
    .post(meetups.createMeetup);

  app.route('/v1/meetups/upcoming')
    .get(meetups.allUpcomings);

  app.route('/v1/meetups/:meetupId')
    .get(meetups.findOne);

  app.route('/v1/meetups/edit')
    .patch(meetups.edit);

  app.route('/v1/meetups/delete')
    .delete(meetups.deleteMeetup);

  /*   app.route('/v1/meetups/:meetupId/rsvps')
    .post(reply); */
};

export default routes;