var 
path = require('path');

module.exports = function (grunt) {
	"use strict";

	grunt.registerMultiTask('publicPath', 'Replace publicPath of image and update the CSS file.', function () {
		var done = this.async();

		var options = this.options({
            imagepath:"/images/",
            imagepathPublic:"//node-img.b0.upaiyun.com/wmzy-pc/images/"
        });

        //console.log("options>>>",options);
        //console.log("this.files>>>",this.files)

		function replaceCSSImagesPath(cssData){
			var oldPath = options.imagepath;
			var newPath = options.imagepathPublic;
			
			var reg = new RegExp('url\\(\\s*([\\\'\\\"])?'+oldPath,'gi');
			//console.log("todo reg:",reg)
			cssData = cssData.replace(reg,'url($1'+newPath);
			//console.log("done cssData.replace");
			//console.log('indexOf ',newPath,': ',cssData.indexOf(newPath));
			return cssData
		}


	

		function donePathReplace(cssData, destCSS){
			grunt.file.write(destCSS, cssData);
			grunt.log.writelns(('Done! [Replace publicPath of image, Created] -> ' + destCSS));
		}

		function staticPathIterator(file, callback){
			var src = file.src[0];
			var fileName = path.basename(src, '.css');

			var destCSS = file.dest;
			var cssData = grunt.file.read(src);
			var newCssData = replaceCSSImagesPath(cssData);

			donePathReplace(newCssData, destCSS);
			callback(null);
		}


		grunt.util.async.forEachSeries(this.files, staticPathIterator, function(success){
			done(success);
		});
	});
};