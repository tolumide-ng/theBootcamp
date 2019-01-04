import chai from 'chai';
import chaiHttp from 'chai-http';

//configure chai
const express = chai.expect;
chai.use(chaiHttp);
chai.should();


describe('Questions', () => {
    const fineboy = {
        email: 'Yourba@demon',
        firstName: 'Newark',
        lastName: 'Stop',
        password: '1234'
    };
    describe('#POST /v1/questions', function(){
        it('should return 400 if required fields are not filled', function(done) {
            chai.request('http://localhost:3000')
                .post('/v1/questions')
                .send({data: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(400);
                })
                done();
        })
    })

    describe('#PATCH /v1/questions/:questionId/upvote', function(done) {
        it('should return 404 if questionId does not exist', function(done) {
            chai.request('http://localhost:3000')
                .patch('/v1/questions/:questionId/upvote')
                .send({theQuestion: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(404);
                })
                done();
        });
    });

    describe('#PATCH /v1/questions/:questionId/downvote', function(done) {
        it('should return 404 if questionId does not exist', function(done) {
            chai.request('http://localhost:3000')
                .patch('/v1/questions/:questionId/downvote')
                .send({theQuestion: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(404);
                })
                done();
        })
    })

    describe('#PATCH /v1/questions/:meetupId', function(done) {
        it('should return 404 if questionId does not exist', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/questions/:meetupId')
                .send({count: 0})
                .then(function (res) {
                    expect(res).to.have.status(404);
                })
                done();
        })
    })

    describe('#DELETE /v1/questions/:questionId/delete', function(){
        it('should return 404 if the question doesnt exist', function(done){
            chai.request('http://localhost:3000')
                .del('/v1/questions/:questionId/delete')
                .send({confirm: 1010})
                .then(function (res) {
                    expect(res).to.have.status(404);
                })
                done();
        })
    })