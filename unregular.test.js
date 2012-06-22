/** Universal Module definition boilerplate **/
(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory( require('../src/unregular') );
	}
	else if ( typeof define === 'function' && define.amd ) {
		define( [ 'Unregular' ] , factory );
	} else {
		root.unregularTest = factory( root.unregular );
	}
/** End boilerplate, begin module definition. **/
/** Arguments in the anonymous functions are dependencies **/
}( this, function( Unregular) {
	'use strict';

		
	describe( 'unregular' , function() {
	
		describe( 'constructor' function ( ) {

			it( 'returns an unregular object ' , function() {
				new Unregular().should.be.instanceOf( Unregular );
			});	

		});

	});
}));
