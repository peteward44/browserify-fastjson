/*jslint node: true */
"use strict";

var fs = require('fs');
var path = require( 'path' );
var transformTools = require( 'browserify-transform-tools' );


var commentRegexs = [
	new RegExp('\/\/[^\r\n]*(\r|\n)+', 'gi'), // end-of-line java style comments, //
	new RegExp('\\/\\*[\\S\\s]*\\*\\/', 'gi')  // C-style /*...*/ comments
];


function removeComments( contents ) {
	for ( var index=0; index<commentRegexs.length; ++index ) {
		contents = contents.replace(commentRegexs[ index ], '');
	}
	return contents;
}


module.exports = transformTools.makeRequireTransform(
	"browserify-fastjson",
	{
		evaluateArguments: true,
		jsFilesOnly: true
	},
	function( args, opts, cb ) {
		var statement = args[0];
		var replacement;
		if ( path.extname( statement ).toLowerCase() === '.json' ) {
			var fullpath = path.normalize( path.resolve( path.dirname( opts.file ), statement ) );
			if ( fs.existsSync( fullpath ) ) {
				// parse then stringify to remove whitespace
				try {
					var contents = fs.readFileSync( fullpath, 'utf8' );
					var cleanContents = removeComments( contents.toString() );
					replacement = JSON.stringify( JSON.parse( cleanContents ) );
				}
				catch ( err ) {
					console.log( err );
					throw new Error( "Invalid JSON in file '" + fullpath + "'" );
				}
			}
		}
		return cb( null, replacement );
	}
);
