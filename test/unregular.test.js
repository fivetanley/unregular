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

		
	describe( 'Unregular' , function() {

		describe( '_definition' , function() {
			
			it( 'exists', function() {
				new Unregular().should.have.ownProperty( '_definition' );
			});

			it( 'is a RegExp object', function(){
				new Unregular()._definition.should.be.instanceOf( RegExp );
			});
		});
	
		describe( '#constructor', function ( ) {

			it( 'returns an Unregular object ' , function() {
				new Unregular().should.be.instanceOf( Unregular );
			});


			it( 'has a default RegExp by default if no arguments passed', function() {
				new Unregular()._definition.toString().should.equal( '/(?:)/' );
			});

			it( 'does not accept anything other than String or RegExp', function(){
				(function() {
					new Unregular( {} );
				}).should.throw();
				(function() {
					new Unregular( new Date() );
				}).should.throw();
				(function() {
					new Unregular( 'foo' );
				}).should.not.throw();
				(function(){
					new Unregular();
				}).should.not.throw();
				(function(){
					new Unregular( new RegExp() );
				}).should.not.throw();
				(function(){
					new Unregular( new Unregular() );
				}).should.not.throw();
			});

			it( 'copies an Unregular instances regex value if passed as the argument', function() {
				var unregToMatch = new Unregular( 'foo '),
					duplicateUnreg = new Unregular( unregToMatch );
				unregToMatch.toRegex().toString().should.equal( duplicateUnreg.toRegex().toString() );
				unregToMatch.should.not.equal( duplicateUnreg );
				unregToMatch._definition = new RegExp();
				unregToMatch._definition.should.not.match( duplicateUnreg._definition );
			});

			it( 'creates a default length property', function() {
				var unreg = new Unregular();
				unreg.should.have.ownProperty( '_length' );
				unreg._length.should.be.a( 'object' );
				unreg._length.should.have.ownProperty( 'min' );
				unreg._length.should.have.ownProperty( 'max' );
				unreg._length.min.should.equal( 0 );
				unreg._length.max.should.equal( - 1);
			});
		});


		describe( '#toRegex', function() {
			it ( 'returns a RegExp object' , function() {
				new Unregular().toRegex().should.be.instanceOf( RegExp );
			});
		});

		describe( '#length', function() {
			var unreg, length;

			beforeEach( function(){ 
				unreg = new Unregular();
				length = unreg.length();
			});
			it( 'returns the length object of the object when no args passed', function(){
				length.should.be.a( 'object' );
			});

			it( 'accepts only objects or numbers for passed arg', function(){
				( function(){
					unreg.length( {} );	
				}).should.throw();
				(function() {
					unreg.length( 'foo' );
				}).should.throw();
			});

			it( 'sets _length.min and _length.max equal if only a number is passed', function(){ 
				unreg.length( 5 );
				unreg.length().should.eql( {min: 5, max: 5} );
			});

			it( 'changes the min and max of _length if an object with min and max properties is passed', function(){
				unreg.length( {min: 5, max: 7} );
				unreg.length().should.eql( {min: 5, max: 7} );
			});

			it( 'only copies the min and max properties of an object to _length', function(){
				unreg.length( { foo: 'bar', min: 5, max: 7});
				unreg._length.should.not.have.ownProperty( 'foo' );
			});

			it( 'throws an error if the passed objects min and max are not numbers', function(){
				(function(){
					unreg.length({ min: 'foo', max: 'foo'} );
				}).should.throw();
			});

			it( 'returns `this` Unregular object if length changes (arguments are passed)', function() {
				var check = unreg.length( 5 );
				check.should.equal( unreg );
				check.length().should.eql( {min: 5, max: 5} );
			});
		});

		describe( '#exec', function() {

			var unreg;

			beforeEach( function() {
				unreg = new Unregular();
			});

			it( 'is a function', function() {
				Unregular.prototype.exec.should.be.a( 'function' );
			});

			it( 'only accepts a string as its argument', function() {
				(function() {
					new Unregular().exec( {} );
				}).should.throw(/only strings/i);
				(function() {
					new Unregular().exec( 'foo');
				}).should.not.throw();
			});

			it( 'returns null if minimum length is not met', function() {
				unreg = unreg.length( { min: 3, max: 5 });
				var result = unreg.exec( '' );
				( result === null ).should.be.true;
			});

			it( 'returns null if maximum length is not met', function() {
				unreg = unreg.length({ min: 5, max: 7} );
				var result = unreg.exec( 'waylongerthan7characters' );
				( result === null ).should.be.true;
			});

			it( 'returns null if string does not match exact _length', function() {
				unreg = unreg.length( 3 );
				var result = unreg.exec( '' );
				( result === null ).should.be.true;
			});
		});

		describe( '#test', function(){

			var unreg;

			beforeEach( function() {
				unreg = new Unregular();
			});
		
			it( 'is a function', function() {
				Unregular.prototype.test.should.be.a( 'function' );
			});

			it( 'returns a boolean value', function(){
				unreg.test( '' ).should.be.a( 'boolean' );
			});

			it( 'returns false if minimum length is not met', function() {
				unreg = unreg.length( { min: 3, max: 5 });
				unreg.test( '' ).should.be.false;
			});

			it( 'returns false if maximum length is not met', function() {
				unreg = unreg.length({ min: 5, max: 7} );
				unreg.test( 'waylongerthan7characters' ).should.be.false;	
			});

			it( 'returns false if string can only be x characters', function() {
				unreg = unreg.length( 3 );
				unreg.test( 'four' ).should.be.false;
			});

			it( 'returns true if the string passes the regex _definition', function() {
				unreg.test( 'foo' ).should.be.true;
				unreg.test( '' ).should.be.true;
				unreg.test( '1' ).should.be.true;
				unreg = new Unregular( 'foo' );
				unreg.test( 'foo' ).should.be.true;
				unreg.test( 'Foo' ).should.be.false;
				unreg = new Unregular( /Tacos/i );
				unreg.test( 'tacos' ).should.be.true;
				unreg.test( 'Tacos' ).should.be.true;
				unreg = new Unregular( unreg );
				unreg.test( 'tacos' ).should.be.true;
				unreg.test( 'Tacos' ).should.be.true;
			});
		});
	});
}));
