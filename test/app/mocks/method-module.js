
module.exports.register = function(App, options, next) {

    App.registerMethod('test', function(done) {
       done(); 
    });

};


module.exports.register.attributes = {
    name: 'method-mock',
    version: '0.1.0'
};
