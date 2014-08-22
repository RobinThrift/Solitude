var App    = require('../../app/app'),
    should = require('should');
require('mocha');


describe('Basic Class', function() {
    
    it('instantiation', function() {
        var app = new App();

        app.should.be.an.instanceOf(App);
    });

    it('extending', function() {
        var MyApp = App.extend({}),
            app   = new MyApp();

        app.should.be.an.instanceOf(MyApp);
    });

});

describe('Events', function() {
    
    it('before:start', function(done) {
        var app = new App();

        app.on('before:start', function() {
            done();
        });
        app.run();
    });

    it('register:module', function(done) {
        var app = new App();
        app.on('register:module', function(App, opts) {
            app.should.equal(App);
            should(opts).equal(app.opts);
            done();
        });
        app.run();
    });
});
