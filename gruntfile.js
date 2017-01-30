module.exports = function(grunt) {

    // Config
    var config = {
        tmp: '.tmp',
        base: '.',
        name: 'amvjvoetbal',
        css_dest: './contents/'
    };


    grunt.initConfig({
        // Project settings
        config: config,

        // Project configuration
        pkg: grunt.file.readJSON('package.json'),

        // Compile Sass
        sass: {
            options: {
                sourceMap: true,
                sourceComments: false
            },
            dist: {
                files: {
                    '<%= config.css_dest %>style.css': '<%= config.css_dest %>style.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= config.css_dest %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.css_dest %>css/',
                    ext: '.min.css'
                }]
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= config.css_dest %>css//*.css',
                        '*.html'
                    ]
                },
                options: {
                    watchTask: true,
                    server: 'C:/wamp64/www/elftalmaker/index.html'
                }
            }
        },

        // Watch and build
        watch: {
            files: ['_layouts/*.html', '*.md', '*.yml'],
            // SASS watch does not work  :(
            sass: {
                files: ['<%= config.css_dest %>*.scss','<%= config.css_dest %>sass/*.scss','<%= config.css_dest %>css/*.css'],
                tasks: ['sass:dist', 'cssmin']
            }
        }
    });

    // Load dependencies
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browser-sync');

    // Run tasks
    grunt.registerTask('default', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);

};