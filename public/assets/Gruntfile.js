module.exports = function (grunt) {

    var dependencies = [
        'moment',
        'redux',
        'keymirror',
        'object-assign',
        'react',
        'react-dom',
        'jsoneditor',
        'jquery',
        'immutable'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            all: {
                files: ['js/**/*.js', 'scss/*.scss', 'js/**/*.jsx'],
                tasks: ['browserify:client', 'compass']
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'js/main.js',
                dest: 'build/js/main.min.js'
            }
        },
        browserify: {
            vendor: {
                src: [],
                dest: 'build/js/vendor.js',
                options: {
                    require: dependencies
                }
            },
            client: {
                files: {
                    'build/js/app.js': ['js/**/*.js', 'js/**/*.jsx']
                },
                options: {
                    debug: false,
                    external: dependencies,
                    transform: [['babelify', {presets: ['react']}]]
                }
            }
        },
        compass: {
            compile: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'build/css'
                }
            },
            options: {
                outputStyle: 'compressed'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task(s).
    grunt.registerTask('default', ['browserify', 'compass']);
    grunt.registerTask('look', ['browserify', 'compass', 'watch']);

};
