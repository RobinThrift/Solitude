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
    var exec = require('child_process').exec;
    exec('./node_modules/.bin/testem');
});


gulp.task('watch', ['default'], function() {
    gulp.watch(config.scripts.src, ['lint']);
});


gulp.task('default', ['lint', 'tests']);
