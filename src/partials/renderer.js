var G = require( './globals.js' );

var renderer = new THREE.WebGLRenderer( { antialias: true , alpha: true } );

renderer.setSize( G.env.width, G.env.height );
renderer.setPixelRatio( G.env.pixel_ratio );
renderer.setClearColor( G.settings.bgColor, 1 );
renderer.autoClear = false;
G.env.canvas.appendChild( renderer.domElement );

module.exports = renderer;
