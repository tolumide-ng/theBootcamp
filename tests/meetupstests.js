// Import dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server.js';

// configure chai
const expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe('Meetups', () => {
    const fineboy = {
        body: 'Yourba demon',
        location: 'Newark',
        topic: 'Stop breaking hearts'
    };
    const two = 2;
    const forConfirm = '0000';

    describe('#GET /v1/meetups', function(){
        it('should return 204 when there are no meetups', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups')
                .then(function (res) {
                    expect(res).to.have.status(204);
                    done();
                })
        });
    })
    
    describe('#GET /v1/meetups/upcoming', function(){
        it('should get all the upcoming meetups', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups/upcoming')
                .send({theLength: 0})
                .then(function (res) {
                    expect(res).to.be.have.status(204);
                    done();
                })
        })
    })

    describe('#GET /v1/meetups/:meetupId', function(){
        it('should find a specific meetup', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups/:meetupId')
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
            })
        })

    describe('#POST /v1/meetups', function(){
        it('should return 204 if parameters are incomplete', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/meetups')
                .send({data: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(204);
                    done();
                })
        })
    })

    describe('#PATCH /v1/meetups/edit', function(){
        it('should return 404 when there is no meetupId', function(done){
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
        it('should return 404 if meetupId is not found', function(done){
            chai.request('http://localhost:3000')
                .del('/v1/meetups/delete')
                .send({confirm: 0})
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })
})