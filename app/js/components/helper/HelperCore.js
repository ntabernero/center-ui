/** @jsx React.DOM */
'use strict';

var React = require('react');

var helpImages = {
	// baseDir: 'images/helper/', <- this woln't work for some reason :(
	search: './images/helper/search.png',
	sidebar: './images/helper/filter.png'
}

var HelpImages = React.createClass({
	render: function(){
		return(
			<div>
				<img src={helpImages.search} className="searchTutImg" />
				<img src={helpImages.sidebar} className="sidebarTutImg" />
			</div>
		);
	}
});

var NextButton = React.createClass({
	render: function(){
		return(
			<button className="ghostButton" onClick={this.props.onProceed}>Next</button>
		);
	}
});

var PreviousButton = React.createClass({
	render: function(){
		return(
			<button className="ghostButton" onClick={this.props.onGoback}>Previous</button>
		);
	}
});

var DoneButton = React.createClass({
	render: function(){
		return(
			<button className="ghostButton" onClick={this.props.onCloseTutorial}>Got it.</button>
		);
	}
});


var HelperActions = React.createClass({
	tutorialProgress: 2,
	toggleElements: {
		clearMasks: function(){
			$('.appendableMask').remove();
		},
		sidebar: {
			show: function(){
				$('.sidebar').addClass('superZ');
				$('.sidebarTutImg').show();
			},
			hide: function(){
				$('.sidebar').removeClass('superZ');
				$('.sidebarTutImg').hide();
			}
		},
		header: {
			show: function(){
				var header 			= $('#header'),
					appendableMask 	= $('<div>').addClass('appendableMask');

				header.addClass('superZ');
				header.find('.row:nth-child(2)').append(appendableMask);
				$('.searchTutImg').css({
					'visibility': 'visible'
				});
			},
			hide: function(){
				var header = $('#header');
				header.removeClass('superZ');
				$('.appendableMask').remove();
				$('.searchTutImg').css({
					'visibility': 'hidden'
				});
			}
		}
	},
	proceed: function(){
		switch(this.tutorialProgress){
			case 1:
				this.toggleElements.sidebar.show();
				this.toggleElements.header.hide();
				this.toggleElements.clearMasks();
				this.tutorialProgress++;
				break;

			case 2:
				this.toggleElements.sidebar.hide();
				this.toggleElements.header.show();
				this.tutorialProgress= 1;
				break;

			default:
				break;

		}
	},
	closeTutorial: function(){
		var helperMask 		= $('.helperMask'),
			sidebar 		= $('.sidebar'),
			helperActions 	= $('.helperActions'),
			appendableMasks = $('.appendableMask');


		this.toggleElements.sidebar.hide();
		this.toggleElements.header.hide();

		// Hide the mask
		helperMask.css({
			'visibility' : 'hidden'
		});

		// Hide the actions toolbar
		helperActions.css({
			'visibility': 'hidden'
		});

	},
	render: function(){
		return(
			<div>
				<HelpImages />
				<div className="helperActions">
					<PreviousButton onGoback={this.goback} />
					<DoneButton onCloseTutorial={this.closeTutorial} />
					<NextButton onProceed={this.proceed} />
				</div>
			</div>
		);
	}
});

var Helper = React.createClass({
	render: function(){
		return(
			<HelperActions />
		);
	}
});

module.exports = Helper;
