var 
path = require('path');

module.exports = function (grunt) {
	"use strict";

	grunt.registerMultiTask('publicPath', 'Replace publicPath of image and update the CSS file.', function () {
		var done = this.async();

		var options = this.options({
            imagepath:"/images/",
            imagepathPublic:"//node-img.b0.upaiyun.com/wmzy-pc/images/"
        }

        console.log("options>>>",options)

		function replaceCSSImagesPath(cssPath,cssData){
			var oldPath = options.imagepath;
			var newPath = options.imagepathPublic;
			
			var reg = new RegExp('url\\(\\s*'+oldPath,'gi');

			cssData = cssData.replace(reg,'url('+newPath);

			/*
			var regImagecss = new RegExp('background(?:-image)?\\s*:[^;]*?url\\((["\\\']?)'+path +'[^\\)]+\\1\\)[^};]*;?','ig');
			var cssList = cssData.match(regImagecss);
			if(cssList && cssList.length){//repeat cssList.length times
				cssList.forEach(function(css){
					cssData = cssData.replace(oldUrl,subFilePath);
				});
			}*/
			return cssData
		}


	

		function donePathReplace(cssData, destCSS){
			grunt.file.write(destCSS, cssData);
			grunt.log.writelns(('Done! [donePathReplace Created] -> ' + destCSS));
		}

		function staticPathIterator(file, callback){
			var src = file.src[0];
			var fileName = path.basename(src, '.css');

			var destCSS = file.dest;
			var cssData = grunt.file.read(src);
			var newCssData = replaceCSSImagesPath(path.dirname(src),cssData);

			donePathReplace(newCssData, destCSS);
			callback(null);
		}


		grunt.util.async.forEachSeries(this.files, staticPathIterator, function(success){
			done(success);
		});
	});
};