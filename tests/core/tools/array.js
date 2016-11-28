/* bender-tags: editor,unit */

( function() {
	'use strict';

	bender.test( {
		setUp: function() {
			this.array = CKEDITOR.tools.array;
		},

		'test array.filter': function() {
			var inputArray = [ 2, 1, 2, 2, '2', 3, 4 ],
				// Keep the original array as a copy, we also want to ensure that it does not modify the
				// original array.
				originalInput = inputArray.slice( 0 ),
				expected = [ 1, '2', 3, 4 ],
				ret = this.array.filter( expected, function( elem ) {
					// Leave anything except 2 (strict compare).
					return elem !== 2;
				} );

			assert.isInstanceOf( Array, ret, 'Return type' );
			arrayAssert.itemsAreSame( expected, ret, 'Return value' );
			arrayAssert.itemsAreSame( originalInput, inputArray, 'The original array has not been modified' );
		},

		'test array.filter context and arguments': function() {
			var context = {
					foo: 'bar'
				};

			this.array.filter( [ 'a', 'b', 'c' ], function( elem, index ) {
				assert.isString( elem, 'Element type' );
				assert.isNumber( index, 'Index type' );
				assert.areSame( context, this, 'Filter context object' );
				return true;
			}, context );
		},

		'test array.forEach': function() {
			var input = [ 1, 2, 3, 4 ],
				output = [];

			this.array.forEach( input, function( elem, index ) {
				output.push( elem );
				assert.areSame( elem - 1, index, 'Index at iteration ' + index );
			} );

			arrayAssert.itemsAreSame( input, output );
		},

		'test array.forEach context': function() {
			var context = {
					foo: 'bar'
				};

			this.array.forEach( [ 1, 1 ], function() {
				assert.areSame( context, this, 'Context object' );
			}, context );
		}
	} );

} )();