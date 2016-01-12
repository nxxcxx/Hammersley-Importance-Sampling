var G = require( './globals.js' );

var camera = new THREE.PerspectiveCamera( 75, G.env.screen_ratio, 10, 100000 );

var orbitCtrl = new THREE.OrbitControls( camera, G.env.canvas );
orbitCtrl.object.position.z = 600;
orbitCtrl.update();

module.exports = camera;
