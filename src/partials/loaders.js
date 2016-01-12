var G = require( './globals.js' );
var setup = require( './setup.js' );
var draw = require( './draw.js' );

var loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => {

	setup();
	draw();

};

loadingManager.onProgress = ( item, loaded, total ) => {

	console.log( loaded + '/' + total, item );

};

var shaderLoader = new THREE.XHRLoader( loadingManager );
shaderLoader.setResponseType( 'text' );
shaderLoader.showStatus = true;

shaderLoader.loadAll = ( shaderContainer, urlObj ) => {

	Object.keys( urlObj ).forEach( ( key ) => {

		shaderLoader.load( urlObj[ key ], ( shader ) => {

			shaderContainer[ key ] = shader;

		} );

	} );

};

shaderLoader.loadAll( G.resources.shaders, {

	Avert: './resources/shaders/shaderA.vert',
	Afrag: './resources/shaders/shaderA.frag'

} );

// var textureLoader = new THREE.TextureLoader( loadingManager );
//
// textureLoader.load( '', ( tex ) => {
//
// 	G.resources.textures.name = tex;
//
// } );
