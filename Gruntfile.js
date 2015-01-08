'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'js/home.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        // 'js/src/bootstrapJS/alert.js',
                        // 'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        // 'js/src/bootstrapJS/modal.js',
                        // 'js/src/bootstrapJS/tooltip.js',
                        // 'js/src/bootstrapJS/popover.js',
                        // 'js/src/bootstrapJS/scrollspy.js',
                        // 'js/src/bootstrapJS/tab.js',
                        // 'js/src/bootstrapJS/affix.js',
                        'js/src/home.js' // <- Modify this
                    ],

                    'js/singular.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        'js/src/bootstrapJS/alert.js',
                        'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        'js/src/bootstrapJS/modal.js',
                        'js/src/bootstrapJS/tooltip.js',
                        'js/src/bootstrapJS/popover.js',
                        'js/src/bootstrapJS/scrollspy.js',
                        'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
                        'js/src/singular.js' // <- Modify this
                    ],

                    'js/archive.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        'js/src/bootstrapJS/alert.js',
                        'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        'js/src/bootstrapJS/modal.js',
                        'js/src/bootstrapJS/tooltip.js',
                        'js/src/bootstrapJS/popover.js',
                        'js/src/bootstrapJS/scrollspy.js',
                        'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
                        'js/src/archive.js' // <- Modify this
                    ],

                    'js/custom.min.js': [
                        'js/src/bootstrapJS/transition.js',
                        'js/src/bootstrapJS/alert.js',
                        'js/src/bootstrapJS/button.js',
                        'js/src/bootstrapJS/carousel.js',
                        'js/src/bootstrapJS/collapse.js',
                        'js/src/bootstrapJS/dropdown.js',
                        'js/src/bootstrapJS/modal.js',
                        'js/src/bootstrapJS/tooltip.js',
                        'js/src/bootstrapJS/popover.js',
                        'js/src/bootstrapJS/scrollspy.js',
                        'js/src/bootstrapJS/tab.js',
                        'js/src/bootstrapJS/affix.js',
                        'js/src/custom.js' // <- Modify this
                    ],                   
                }
            }
        },

        jshint: {
            all: [
                'js/src/*.js',
                '!js/bootstrap.min.js',
                '!js/jquery.min.js'
            ]
        },

        compass:{ // https://github.com/gruntjs/grunt-contrib-compass
            src:{
                options: {
                    sassDir:['css/src/sass'],
                    cssDir:['css'],
                    outputStyle: 'compressed'
                }
            },
        },

        less: { // https://github.com/gruntjs/grunt-contrib-less
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'admin/css/bootstrap.min.css': [
                        'admin/css/src/less/bootstrap.less'
                        ],
                  }
            }
        },

        csslint: { // http://astainforth.com/blogs/grunt-part-2
            files: ['css/*.css', '!css/bootstrap.min.css',],
            options: {
                "important": false,
                "ids": false,
            }
        },

        copy: { // https://github.com/gruntjs/grunt-contrib-copy
            srcfont: {
                expand: true,
                cwd: 'bower_components/bootstrap/',
                src: 'fonts/*',
                dest: 'src/',
                filter: 'isFile',
            },
            destfont: {
                expand: true,
                cwd: 'src',
                src: 'fonts/*',
                dest: 'dest/',
                filter: 'isFile',
            },
            tosvn: {
                expand: true,
                // cwd: 'src',
                src: [
                    '**',
                    '!node_modules/**',
                    '!bower_components/**',
                    '!bower.json',
                    '!composer.json',
                    '!Gruntfile.js',
                    '!package.json',
                    '!README.md',
                    ],
                dest: 'E:/Dropbox/svn-wordpress/italystrap/trunk/',
                filter: 'isFile',
                // options: {
                //     noProcess: '!node_modules/',
                // },
            }
        },

        sync: { // https://www.npmjs.com/package/grunt-sync
            main: {
                files: [{
                    cwd: 'src',
                    src: [
                        '**', /* Include everything */
                        '!**/*.txt' /* but exclude txt files */
                        ],
                    dest: 'bin',
                    }],
            pretend: true, // Don't do any IO. Before you run the task with `updateAndDelete` PLEASE MAKE SURE it doesn't remove too much.
            verbose: true // Display log messages when copying files
            }
        },

        watch: { // https://github.com/gruntjs/grunt-contrib-watch
            css: {
                files: ['**/*.{scss,sass}'],
                tasks: ['testcssbuild'],
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['testjsbuild'],
            },
            options: {
                livereload: 9000,
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('testcssbuild', ['less', 'compass', 'csslint']);
    grunt.registerTask('testjsbuild', ['jshint', 'uglify']);

    // After botstrap update execute "grunt bootstrap"
    grunt.registerTask('bootstrap', ['uglify:bootstrapJS', 'less']);


    grunt.registerTask('test', ['jshint', 'csslint']);
    grunt.registerTask('build', ['uglify', 'less', 'compass']);

    grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
    });

}