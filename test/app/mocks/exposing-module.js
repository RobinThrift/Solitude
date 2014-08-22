
module.exports.register = function(App, options, next) {

    App.expose({
        test: function(done) {
            done();
        }
    });
};


module.exports.register.attributes = {
    name: 'expose-mock',
    version: '0.1.0'
};
