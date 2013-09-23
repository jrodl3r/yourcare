/*global module:false*/

module.exports = function(grunt){
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/* <%= pkg.name %> v<%= pkg.version %> ' +
		'(<%= grunt.template.today("yyyy-mm-dd") %>) - <%= pkg.author.name %> */\n',

		sass: {
			dev: {
				options: {
					style: 'expanded',
					compass: true,
					sourcemap: true
				},
				files: {
					'css/base.css': 'css/base.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					compass: true,
					sourcemap: false
				},
				files: {
					'css/dist.css': 'css/base.scss'
				}
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= jshint.dist.src %>',
				dest: 'js/dist.js'
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					"$": false,
					"jQuery": false,
					"console": false
				}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			dist: {
				options: {
					ignores: ['js/dist.js']
				},
				src: ['js/*.js']
			}
		},

		preprocess: {
			dist: {
				src: 'tmpl/index.html',
				dest: 'index.html'
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: false
				},
				files: {
					'index.html': 'index.html'
				}
			}
		},

		clean: {
			html: ['index.html'],
			js: ['js/dist.js']
		},

		env: {
			dev: {
				NODE_ENV: 'DEV'
			},
			dist: {
				NODE_ENV: 'DIST'
			}
		},

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			js: {
				files: '<%= jshint.dist.src %>',
				tasks: ['jshint', 'notify:js'],
				options: { livereload: true }
			},
			sass: {
				files: 'css/**/*.scss',
				tasks: ['sass:dev', 'notify:sass'],
				options: { livereload: true }
			},
			html: {
				files: 'tmpl/index.html',
				tasks: ['env:dev', 'preprocess', 'notify:dev'],
				options: { livereload: true }
			}
		},

		notify: {
			dev: {
				options: {
					title: 'Grunt',
					message: 'Build Completed'
				}
			},
			sass: {
				options: {
					title: 'Grunt',
					message: 'Sass Compiled'
				}
			},
			js: {
				options: {
					title: 'Grunt',
					message: 'JS Uglified'
				}
			},
			dist: {
				options: {
					title: 'Grunt',
					message: 'Release Completed'
				}
			}
		},
		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 0 // max jshint msg
			}
		},
		webfont: {
			icons: {
				src: 'img/icons/*.svg',
				dest: 'build/fonts'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('default', ['clean:html', 'env:dev', 'sass:dev', 'jshint', 'preprocess', 'htmlmin', 'notify:dev']);
	grunt.registerTask('webfont', ['webfont']);
	grunt.registerTask('dist-css', ['sass:dist', 'notify:sass']);
	grunt.registerTask('dist-js', ['clean:js', 'jshint', 'uglify', 'notify:js']);
	grunt.registerTask('dist', ['env:dist', 'clean', 'sass:dist', 'jshint', 'uglify', 'preprocess', 'htmlmin', 'notify:dist']);
	grunt.task.run('notify_hooks');
};
