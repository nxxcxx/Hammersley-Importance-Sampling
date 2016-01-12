var G = require( './globals.js' );
var camera = require( './camera.js' );
var renderer = require( './renderer.js' );

window.addEventListener( 'keypress', event => {

	switch( event.keyCode ) {

		case 65:/*A*/
		case 97:/*a*/ G.settings.enableGridHelper ^= 1; toggleHelpers();
		break;

		case 83 :/*S*/
		case 115:/*s*/ G.settings.enableAxisHelper ^= 1; toggleHelpers();
		break;

	}

} );

window.addEventListener( 'resize', debounce( onWindowResize, 50 ) );

function onWindowResize() {

	G.env.width = window.innerWidth;
	G.env.height = window.innerHeight;

	G.env.pixel_ratio = window.devicePixelRatio || 1;
	G.env.screen_ratio = G.env.width / G.env.height;

	camera.aspect = G.env.screen_ratio;
	camera.updateProjectionMatrix();

	renderer.setSize( G.env.width, G.env.height );
	renderer.setPixelRatio( G.pixel_ratio );

}

function debounce(func, wait, immediate) {

	var timeout;
	return () => {

		var context = this, args = arguments;

		var later = () => {

			timeout = null;
			if (!immediate) func.apply(context, args);

		};

		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);

	};

}
