var events    = require('backbone-events-standalone'),
    extend    = require('ampersand-class-extend'),
    eachAsync = require('async-foreach').forEach,
    defaults  = require('lodash.defaults'),
    App, AppDefaults;

AppDefaults = {
    modules: []
};

App = function(opts) {
    this.opts = defaults(opts || {}, AppDefaults);
    this.methods = {};
    this.modules = {};
};

App.extend = extend;

events.mixin(App.prototype);

App.prototype.run = function() {
    this.trigger('before:start');
    this.trigger('start');    
    
    var that = this;
    this._registerModules(function() {
        that.trigger('after:start');
    });
};

App.prototype._registerModules = function(cb) {
    var that = this;
    eachAsync(this.opts.modules, function(mod) {
        var done = this.async();
        that.pluginAttrs = mod.register.attributes;
        mod.register(that, that.opts, done);
    }, function(notAborted) {
        if (!notAborted) { throw new Error('Module registration aborted early'); }
        cb();
    });
};

App.prototype.registerMethod = function(name, fn) {
    this.methods[name] = fn;
};

App.prototype.method = function(name) {
    var args = Array.prototype.slice.apply(arguments, [1]);
    this.methods[name].apply(this, args);
};

App.prototype.expose = function(obj) {
    this.modules[this.pluginAttrs.name] = obj;
};

module.exports = App;
