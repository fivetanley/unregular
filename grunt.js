module.exports = function gruntConfigure (grunt) {
	'use strict';
	grunt.initConfig({
		lint: {
			all: [ 'src/*.js' ]
		},

		test: {
			all: [ 'src/*.js' ]
		}
	});
};
