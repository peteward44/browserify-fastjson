/*jslint node: true */
"use strict";

var fs = require('fs');
var path = require( 'path' );
var transformTools = require( 'browserify-transform-tools' );

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
				var contents = fs.readFileSync( fullpath );
				// parse then stringify to remove whitespace
				try {
					replacement = JSON.stringify( JSON.parse( contents ) );
				}
				catch ( err ) {
					throw new Error( "Invalid JSON in file '" + fullpath + "'" );
				}
			}
		}
		return cb( null, replacement );
	}
);
