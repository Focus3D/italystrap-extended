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

        version: {  // https://www.npmjs.com/package/grunt-version
                    // http://jayj.dk/using-grunt-automate-theme-releases/
            bower: {
                src: [ 'bower.json' ],
            },
            php: {
                options: {
                    prefix: 'Version\\:\\s+'
                },
                src: [ 'italystrap.php' ],
            },
            readme: {
                options: {
                    prefix: 'Stable tag\\:\\s'
                },
                  src: ['readme.txt']
            },
        },

        // 'copy-part-of-file': { // https://github.com/dehru/grunt-copy-part-of-file
        //     copyReadme: {
        //         options: {
        //             sourceFileStartPattern: '=== ItalyStrap ===',
        //             sourceFileEndPattern: 'First release.',
        //             destinationFileStartPattern: '=== ItalyStrap ===',
        //             destinationFileEndPattern: 'First release.'
        //         },
        //         files: {
        //             'README.md': ['readme.txt']
        //         }
        //     }
        // },

        wp_readme_to_markdown: {
            readme: {
                files: {
                  'README.md': 'readme.txt'
                },
            },
        },

        copy: { // https://github.com/gruntjs/grunt-contrib-copy
            // srcfont: {
            //     expand: true,
            //     cwd: 'bower_components/bootstrap/',
            //     src: 'fonts/*',
            //     dest: 'src/',
            //     filter: 'isFile',
            // },
            // destfont: {
            //     expand: true,
            //     cwd: 'src',
            //     src: 'fonts/*',
            //     dest: 'dest/',
            //     filter: 'isFile',
            // },
            tosvn: {
                expand: true,
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
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-copy-part-of-file');
    grunt.loadNpmTasks('grunt-wp-readme-to-markdown');



    grunt.registerTask('deploy', [
                                'version',
                                // 'copy-part-of-file',
                                'wp_readme_to_markdown',
                                ]);


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