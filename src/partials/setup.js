var G = require( './globals.js' );
var scene = require( './scene.js' );
var gui = require( './gui.js' );

function setup() {

	// ---- grid & axis helper
	var gridHelper = new THREE.GridHelper( 600, 50 );
	gridHelper.setColors( 0x00aaff, 0xffffff );
	gridHelper.material.opacity = 0.1;
	gridHelper.material.transparent = true;
	gridHelper.position.y = -300;
	scene.add( gridHelper );

	var axisHelper = new THREE.AxisHelper( 50 );
	scene.add( axisHelper );

	global.toggleHelpers = function () {

		gridHelper.visible = !!G.settings.enableGridHelper;
		axisHelper.visible = !!G.settings.enableAxisHelper;

	};

	toggleHelpers();

	// ---- GUI
	gui.init();

	// ---- Content
	var RADIUS = 100;
	var sphGeom = new THREE.SphereGeometry( RADIUS, 12, 12, 0, Math.PI, 0, Math.PI );
	var sphMate = new THREE.MeshBasicMaterial( {
		wireframe: true,
		transparent: true,
		opacity: 0.1
	} );
	var sphMesh = new THREE.Mesh( sphGeom, sphMate );
	scene.add( sphMesh );

	var ROUGHNESS = 0.7;
	var SAMPLE_SIZE = 1024;

	var Hpos = new Float32Array( SAMPLE_SIZE * 3 );

	for ( var i = 0; i < SAMPLE_SIZE; i++ ) {

		var x = i / SAMPLE_SIZE;
		var y = ( i << 16 | i >>> 16 ) >>> 0;
		y = ( ( y & 1431655765 ) << 1 | ( y & 2863311530 ) >>> 1 ) >>> 0;
		y = ( ( y & 858993459 ) << 2 | ( y & 3435973836 ) >>> 2 ) >>> 0;
		y = ( ( y & 252645135 ) << 4 | ( y & 4042322160 ) >>> 4 ) >>> 0;
		y = ( ( ( y & 16711935 ) << 8 | ( y & 4278255360 ) >>> 8 ) >>> 0 ) / 4294967296;

		var a = ROUGHNESS * ROUGHNESS;
		var phi = 2.0 * Math.PI * x;
		var cosTheta = Math.sqrt( ( 1 - y ) / ( 1 + ( a * a - 1.0 ) * y ) );
		var sinTheta = Math.sqrt( 1.0 - cosTheta * cosTheta );

		var offset = i * 3;
		Hpos[ offset ] = sinTheta * Math.cos( phi ) * RADIUS;
		Hpos[ offset + 1 ] = sinTheta * Math.sin( phi ) * RADIUS;
		Hpos[ offset + 2 ] = cosTheta * RADIUS;

		// // 2D
		// Hpos[ offset ] = x * RADIUS;
		// Hpos[ offset + 1 ] = y * RADIUS;
		// Hpos[ offset + 2 ] = 0.0;

	}

	var Hgeom = new THREE.BufferGeometry();
	Hgeom.addAttribute( 'position', new THREE.BufferAttribute( Hpos, 3 ) );
	var Hmat = new THREE.PointsMaterial( { color: 0x00ffff } );
	var Hmesh = new THREE.Points( Hgeom, Hmat );
	scene.add( Hmesh );

	// http://holger.dammertz.org/stuff/notes_HammersleyOnHemisphere.html
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
	// http://stackoverflow.com/questions/1908492/unsigned-integer-in-javascript
	// http://stackoverflow.com/questions/1822350/what-is-the-javascript-operator-and-how-do-you-use-it

}

module.exports = setup;
