var events = require('backbone-events-standalone'),
    extend = require('ampersand-class-extend'),
    App;

App = function(opts) {
    this.opts = opts;
    this.commands = {};
    this.handlers = {};
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
