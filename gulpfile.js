'use strict';
// simple GULP 2 process sass and enable browsersync


// w/watch function now... and it works!!!!!
var gulp         = require('gulp');
var sass         = require('gulp-ruby-sass');
var filter       = require('gulp-filter');
var browserSync  = require('browser-sync');
var reload       = browserSync.reload;


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        proxy: "dev.project"
    });

    gulp.watch("scss/*.scss", ['sass']);
    gulp.watch("*.css").on('change', reload);
    // here can add any watch task as needed
    gulp.watch("*.php").on('change', reload);
});


gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('assets/css'))// Write the CSS & Source maps
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('default', ['serve']);
