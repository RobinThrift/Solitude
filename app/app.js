var events = require('backbone-events-standalone'),
    extend = require('ampersand-class-extend'),
    App;
    defaults  = require('lodash.defaults'),
    App, AppDefaults;
AppDefaults = {
    modules: []
};

App = function(opts) {
    this.commands = {};
    this.handlers = {};
    this.opts = defaults(opts || {}, AppDefaults);
};

App.extend = extend;

events.mixin(App.prototype);

App.prototype.run = function() {
    this.trigger('before:start');
    this.trigger('register:module', this, this.opts);
    this.trigger('start');
    this.trigger('after:start');
    this.trigger('run');
};

module.exports = App;
