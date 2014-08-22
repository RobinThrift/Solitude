var App    = require('../../app/app'),
    should = require('should');


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
   
    var app;

    it('before:start', function(done) {
        app = new App();

        app.on('before:start', function() {
            done();
        });
        app.run();
    });

    it('after:start', function(done) {
        app = new App();

        app.on('after:start', function() {
            done();
        });
        app.run();
    });
});

describe('Modules', function() {

    it('registration', function() {
        var app = new App({
            modules: [
                require('./mocks/module')
            ] 
        });

        app.run();
    });

    it('registering a method', function(done) {

        var app = new App({
            modules: [
                require('./mocks/method-module')
            ] 
        });

        app.run();

        app.method('test', done);
    });

    it('exposing an object', function(done) {

        var app = new App({
            modules: [
                require('./mocks/exposing-module')
            ] 
        });

        app.run();
       
        app.modules['expose-mock'].test(done);
    });

});
