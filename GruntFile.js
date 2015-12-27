grunt.registerTask('default', ['qunit_junit', 'qunit']);
grunt.loadNpmTasks('grunt-contrib-qunit');
   grunt.loadNpmTasks('grunt-qunit-istanbul');
   gruntConfig.qunit = {
       src: ['static/test/index.html'],
       options: {
       coverage: {
         src: ['static/js/**/*.js'],
         instrumentedFiles: 'temp/',
         htmlReport: 'report/coverage',
         coberturaReport: 'report/',
         linesThresholdPct: 20
       }
       }
   };
   grunt.loadNpmTasks('grunt-qunit-junit');
   gruntConfig.qunit_junit = {
       options: {
           dest: 'report/'
       }
   };
