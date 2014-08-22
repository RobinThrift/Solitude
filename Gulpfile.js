var gulp   = require('gulp'),
    config = {
        scripts: {
            src: ['app/*.js'],
            tests: ['test/app/*.js']
        }
    };


gulp.task('lint', function() {
    var jshint = require('gulp-jshint');
    return gulp.src(config.scripts.src)
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'));
});


gulp.task('tests', function() {
    var mocha = require('gulp-mocha'),
        gutil = require('gulp-util');
    return gulp.src(config.scripts.tests, {read: false})
               .pipe(mocha({
                   reporter: 'spec',
                   globals: {
                       should: require('should')
                   }
               }))
               .on('error', function(err) {
                   console.log(err.toString());
                   this.emit('end');
               });
});


gulp.task('watch', ['default'], function() {
    gulp.watch(config.scripts.src, ['lint']);
    gulp.watch(config.scripts.tests, ['tests']);
});


gulp.task('default', ['lint', 'tests']);
