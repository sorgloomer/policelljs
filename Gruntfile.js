module.exports = function(grunt) {

  grunt.initConfig({
    wiredep: {
      app: {
        src: [
          'app/public/index.html'
        ],
        exclude: [
          'components/bootstrap/dist/js/bootstrap.js'
        ]
      }
    }
  });
  
  require('load-grunt-tasks')(grunt);
};