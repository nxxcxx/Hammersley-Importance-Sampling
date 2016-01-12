var G = {

	env: {

		width: window.innerWidth,
		height: window.innerHeight,
		pixel_ratio: window.devicePixelRatio || 1,
		screen_ratio: window.innerWidth / window.innerHeight,
		canvas: document.getElementById( 'canvas-container' ),

	},

	settings: {

		bgColor: 0x2E353C,
		enableGridHelper: true,
		enableAxisHelper: true

	},

	resources: {

		shaders: {},
		textures: {}

	}

};

global.G = G;
module.exports = G;
