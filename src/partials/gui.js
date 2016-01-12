var gui, gui_display, gui_settings;
var G = require( './globals.js' );
var camera = require( './camera.js' );
var renderer = require( './renderer.js' );

function init() {

	// gui_settings.add( Object, property, min, max, step ).name( 'name' );

	gui = new dat.GUI();
	gui.width = 300;

	gui_display = gui.addFolder( 'Display' );
		gui_display.autoListen = false;

	gui_settings = gui.addFolder( 'Settings' );

		gui_settings.addColor( G.settings, 'bgColor' ).name( 'Background' );
		gui_settings.add( camera, 'fov', 25, 120, 1 ).name( 'FOV' );

	gui_display.open();
	gui_settings.open();

	gui_settings.__controllers.forEach( ( controller ) => {

		controller.onChange( updateSettings );

	} );

}

function updateSettings() {

	camera.updateProjectionMatrix();
	renderer.setClearColor( G.settings.bgColor , 1.0 );

}

function update() {

	gui_display.__controllers.forEach( ( controller ) => {

		controller.updateDisplay();
		
	} );

}

module.exports = {

	init: init,
	update: update

};
