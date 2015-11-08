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

	// grunt.registerTask("compileGame", "Finds and prepares modules for concatenation.", function() {

	//     // get all module directories
	//     grunt.file.expand("src/*").forEach(function (dir) {

	//         // get the module name from the directory name
	//         var dirName = dir.substr(dir.lastIndexOf('/')+1);

	//         // get the current concat object from initConfig
	//         var concat = grunt.config.get('concat') || {};

	//         // create a subtask for each module, find all src files
	//         // and combine into a single js file per module
	//         concat[dirName] = {
	//             src: [dir + '/**/*.js'],
	//             dest: 'compiled' + dirName + '.js'
	//         };

	//         // add module subtasks to the concat task in initConfig
	//         grunt.config.set('concat', concat);
	//     });
	//     grunt.task.run('concat');
	// });

	// the default task
	grunt.registerTask("default", ["concat", "watch"]);

};