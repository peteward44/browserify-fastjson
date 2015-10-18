/*jslint node: true */
"use strict";

var fs = require('fs');
var path = require( 'path' );
var transformTools = require( 'browserify-transform-tools' );

module.exports = transformTools.makeRequireTransform(
	"browserify-fastjson",
	{
		evaluateArguments: true,
		jsFilesOnly: false
	},
	function( args, opts, cb ) {
		var statement = args[0];
		var replacement;
		if ( path.extname( statement ).toLowerCase() === '.json' ) {
			var fullpath = path.normalize( path.resolve( path.dirname( opts.file ), statement ) );
			if ( fs.existsSync( fullpath ) ) {
				var contents = fs.readFileSync( fullpath );
				replacement = contents;
			}
		}
		return cb( null, replacement );
	}
);
