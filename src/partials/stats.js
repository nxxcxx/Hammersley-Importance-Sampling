var G = require( './globals.js' );
var stats = new Stats();
G.env.canvas.appendChild( stats.domElement );

module.exports = stats;
