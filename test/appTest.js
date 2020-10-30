const expect = require('chai').expect;
const request = require('request');

it('Home page content', (done) => {
  request('http://localhost:8000', (e, res, body) => {
    expect(body).to.equal('Hello World');
    done();
  });
});
