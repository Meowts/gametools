module.exports = function(grunt){

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
  
		concat : {
			Data : {
				src : "src/data/*.js",
				dest : "compiled/Data.js"
			},	

			Classes : {
				src : "src/classes/*.js",
				dest : "compiled/Classes.js"
			},	

			Screens : {
				src : "src/screens/*.js",
				dest : "compiled/Screens.js"
			},	

			States : {
				src : "src/states/*.js",
				dest : "compiled/States.js"
			}
		},

		watch : {
			files : ["src/**/*.js"],
			tasks : ['concat']
		}
    });

	// the default task
	grunt.registerTask("default", ["concat", "watch"]);

};