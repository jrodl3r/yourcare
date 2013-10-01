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
					'css/dist.css': 'css/core.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed',
					compass: true,
					sourcemap: false
				},
				files: {
					'css/dist.min.css': 'css/core.scss'
				}
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				mangle: {
					except: ['$routeProvider']
				}
			},
			dist: {
				src: '<%= jshint.dist.src %>',
				dest: 'js/dist.min.js'
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
					ignores: ['js/dist.min.js']
				},
				src: ['js/*.js']
			}
		},

		concat: {
			options: {
				separator: '/**************************************/',
			},
			dist: {
				src: ['js/vendor/angular/angular.min.js', 'js/vendor/angular-route/angular-route.min.js', 'js/vendor/jquery/jquery.min.js', 'js/dist.min.js'],
				dest: 'js/dist.min.js'
			}
		},

		preprocess: {
			dist: {
				src: 'tmpl/index.html',
				dest: 'index.html'
			}
		},

		htmlmin: {
			dev: {
				options: {
					removeComments: false,
					collapseWhitespace: false
				},
				files: {
					'index.html': 'index.html'
				}
			},
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.html': 'index.html'
				}
			}
		},

		clean: {
			html: ['index.html'],
			js: ['js/dist.min.js']
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
				files: ['tmpl/index.html', 'partials/*.html'],
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('default', ['clean:html', 'env:dev', 'sass:dev', 'jshint', 'preprocess', 'htmlmin:dev', 'notify:dev']);
	grunt.registerTask('dist-css', ['sass:dist', 'notify:sass']);
	grunt.registerTask('dist-js', ['clean:js', 'jshint', 'uglify', 'notify:js']);
	grunt.registerTask('dist', ['env:dist', 'clean', 'sass:dist', 'jshint', 'uglify', 'concat', 'preprocess', 'htmlmin:dist', 'notify:dist']);
	grunt.task.run('notify_hooks');
};
