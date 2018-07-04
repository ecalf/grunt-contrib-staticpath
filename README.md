# grunt-contrib-staticpath  usage in gruntfile

`
publicPath:{
            options:{
                imagepath:"/images/",
                imagepathPublic:"//node-img.b0.upaiyun.com/wmzy-pc/images/"
            },
            autoPublicPath:{
                files: [
                    {
                        expand: true,
                        cwd: "public/src/css/",  
                        src: "**/*.css",
                        dest: "public/src/css/"
                    }
                ]
            }
            
        },




grunt.loadNpmTasks('grunt-contrib-staticpath');


//test task
grunt.registerTask('test',["publicPath"]);

`