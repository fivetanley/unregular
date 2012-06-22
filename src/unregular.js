/**
 * @module Unregular
 * @version 0.0.1
 * @license MIT
 */

/** Universal Module definition boilerplate **/
(function (root, factory) {
	if ( typeof exports === 'object' ) {
		module.exports = factory();
	}
	else if ( typeof define === 'function' && define.amd ) {
		define( [  ] , factory );
	} else {
		root.Unregular = factory();
	}
/** End boilerplate, begin module definition. **/
/** Arguments in the anonymous functions are dependencies **/
}( this, function( ) {
	'use strict';

	/**
	 * @constructor
	 * @param { String || RegExp || Unregular } def 
	 *
	 * Create a new Unregular object based on def, a String, RegExp, or other Unregular object
	 */
	function Unregular( def) {
		this._length = {
			min: 0,
			max: -1
		};
		if ( def !== undefined ) {
			if ( typeof def === 'object' ) {
				if ( def instanceof Unregular ) {
					this._definition = def.toRegex();
					return;
				} else if ( def instanceof RegExp ) {
					this._definition = new RegExp( def );
					return;
				}
			} else if ( typeof def === 'string' ) {
				this._definition = new RegExp( def );
				return;
			} 
			throw new Error( 'Unregular can only accept strings, Unregular objects, or RegExp objects');
		}
		this._definition = new RegExp('');
	
	}
	/**
	 * Return a new RegExp object based off definition
	 * @return { RegExp } Brand spankin' new RegExp object for your pleasure.
	 */
	Unregular.prototype.toRegex = function(){
		return new RegExp( this._definition );
	};

	/**
	 * Return information about matches in a String.
	 *
	 * Uses RegExp.exec after checking that total length ( as designated by `_length` )
	 * is correct.
	 *
	 * @param { String } stringToMatch String to compare regex definition against.
	 * @return { null } if no match
	 * @return { Array } Array of information like normal `RegExp.exec()`
	 */
	Unregular.prototype.exec = function( stringToMatch ) {
		if ( typeof stringToMatch !== 'string' ) {
			throw new Error( 'Only strings can be matched' );
		}
		if ( stringToMatch.length > this._length.max || stringToMatch.length < this._length.min ){ 
			return null;
		}
		return this._definition.exec( stringToMatch ); 
	};

	/**
	 * Return either a copy of the internal length object, or
	 * `this` Unregular object if arguments are passed and valid arguments.
	 *
	 * If just a number is passed, then min and max will be set to that number.
	 * If an object with min and max properties, and those properties are numeric, the internal
	 * _length object will acquire those values.
	 *
	 * @param { none || number || Object } length None, or an exact length, or a minimum and maximum. 
	 * @return { Object } if no arguments passed.
	 * @return { Unregular } if valid arguments passed.
	 */
	Unregular.prototype.length = function( length ) {
		if ( !length ) {
			return {
				min: Number( this._length.min),
				max: Number( this._length.max)
			};
		}
		if ( typeof length === 'number' ) {
			this._length = {
				min: length,
				max: length
			};
			return this;
		}	
		if ( typeof length === 'object' ) {
			if ( typeof length.min === 'number' && typeof length.max === 'number' ) {
				this._length.min = length.min;
				this._length.max = length.max;
				return this;
			}
		}
		throw new Error( 'Only objects with min and max property or numbers may be passed' );
	};

	/** 
	 * Uses RegExp's test method to see if a String matches a RegExp.  Also validates for total length.
	 *
	 * @param { String } subject the string to validate
	 * @return { Boolean } true if match, false if not
	 */
	Unregular.prototype.test = function( subject ) {
		if ( subject.length < this._length.min ) {
			return false;
		}
		if ( this._length.max !== -1 && subject.length > this._length.max ) {
			return false;
		}
		return this._definition.test( subject );	
	};

	return Unregular;
}));
