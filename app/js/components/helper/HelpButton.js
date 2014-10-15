/** @jsx React.DOM */
'use strict';

var React = require('react');

var HelpActivationButton = React.createClass({
	activateHelpOverlay: function(){
		var helperMask 		= $('.helperMask'),
			sidebar 		= $('.sidebar'),
			userMenu 		= $('#user-menu'),
			header 			= $('#header'),
			helperActions 	= $('.helperActions'),
			appendableMask 	= $('<div>').addClass('appendableMask');

		// Show the mask
		helperMask.css({
			'visibility' : 'visible'
		});


		// Pop the sidebar and all assets related
		// Will be combined with HelperCore later

		$('.sidebarTutImg').show();
		sidebar.addClass('superZ');
		$('.sidebarTutImg').css({
			'visibility': 'visible'
		});
		helperActions.css({
			'visibility': 'visible'
		});
	},
	render: function(){
		return(
			<HelpButton onHelpClick={this.activateHelpOverlay} />
		);
	}
});

var HelpButton = React.createClass({
	render: function(){
		return(
			<li><a href="#" onClick={this.props.onHelpClick}><i className="fa fa-support"></i> Help</a></li>
		);
	}
});

module.exports = HelpActivationButton;
