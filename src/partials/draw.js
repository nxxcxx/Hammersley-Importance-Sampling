var scene = require( './scene.js' );
var camera = require( './camera.js' );
var renderer = require( './renderer.js' );
var stats = require( './stats.js' );

function update() {



}

function draw() {

	requestAnimationFrame( draw );
	renderer.clear();
	update();
	renderer.render( scene, camera );
	stats.update();

}

module.exports = draw;
