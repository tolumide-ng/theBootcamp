//Import dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';

//configure chai
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe('Meetups', () => {
    const fineboy = {
        body: 'Yourba demon',
        location: 'Newark',
        topic: 'Stop breaking hearts'
    };

    describe('#GET /v1/meetups/upcoming', function(){
        it('should return 404 if there are no meetups', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups/upcoming')
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

    describe('#GET /v1/meetups', function(){
        it('should return 404 if there are no meetups', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups')
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

    describe('#GET /v1/meetups/:meetupId', function(){
        it('should return 404 if specific meetup does not exist', function(done) {
            chai.request('http://localhost:3000')
            .get('/v1/meetups/:meetupId')
            .then(function (res) {
                expect(res).to.have.status(404);
                done();
            })
        })
    })

    describe('#POST /v1/meetups', function(){
        it('should return 422 if parameters are incomplete', function(done){
            chai.request('http://localhost:3000')
                .post('/v1/meetups')
                .send({data: fineboy})
                .then(function (res) {
                    expect(res).to.has.status(422);
                    done();
                })
        })
    })

    describe('#PATCH /v1/meetups/edit', function(){
        it('should return 404 if meetup does not exist', function(done){
            chai.request('http://localhost:3000')
                .get('/v1/meetups/edit')
                .send({confirm: 0})
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

    describe('#DELETE /v1/meetups/delete', function(){
        it('should return 404 if meetupId is not found', function(done) {
            chai.request('http://localhost:3000')
                .del('/v1/meetups/delete')
                .send({confirm: 0})
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

    describe('#POST /v1/meetups/:meetupId/rsvps', function(){
        it('should return 422 if any supplied information is incorrect', function(done) {
            chai.request('http://localhost:3000')
                .post('/v1/meetups/:meetupId/rsvps')
                .send({data: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(422);
                    done();
                })
        })
    })
})