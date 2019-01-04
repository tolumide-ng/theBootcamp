import chai from 'chai';
import chaiHttp from 'chai-http';


//configure chai
const expect = chai.expect;
chai.expect(chaiHttp);
chai.should();

describe('Users', () => {
    const fineboy = {
        email: 'Yourba@demon',
        firstName: 'Newark',
        lastName: 'Stop',
        password: '1234'
    };
    describe('#GET /v1/users/profile', function(){
        it('should return 404 and json body', function(done) {
            chai.request('http://localhost:3000')
                .get('/v1/users/profile')
                .send({exist: 0})
                .then(function (res) {
                    expect(res).to.have.status(404);
                    done();
                })
        })
    });

    describe('#POST /v1/users/signup', function() {
        it('should return 400 status code', function(done){
            chai.request('http://localhost:3000')
                .post('/v1/users/signup')
                .send({data: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(400);
                    done();
                })
        })
    });

    describe('#POST /v1/users/login', function() {
        it('should return status code 401', function(done){
            chai.request('http://localhost:3000')
                .post('/v1/users/login')
                .send({data: fineboy})
                .then(function (res) {
                    expect(res).to.have.status(401);
                    done();
                })
        })
    });
});
