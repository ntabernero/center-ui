/** @jsx React.DOM */
'use strict';

var React = require('react');

var helpImages = {
	search: './images/helper/search.png',
	sidebar: './images/helper/filter.png'
};

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
			<button id="nextButton" className="ghostButton pulse" onClick={this.props.onProceed}>Next</button>
		);
	}
});

var DoneButton = React.createClass({
	render: function(){
		return(
			<button id="doneButton" className="ghostButton" onClick={this.props.onCloseTutorial}>Got it</button>
		);
	}
});


var HelperActions = React.createClass({
	tutorialProgress: 2,
	globals: {
		nextButton: $('#nextButton'),
		doneButton: $('#doneButton')
	},
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
					appendableMask= $('<div>').addClass('appendableMask');

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
	restartInteractiveHelp: function(){
		$('#nextButton').text('Next');
		$('#doneButton').removeClass('pulse');
		$('#nextButton').addClass('pulse');
	},
	lastSlide: function(){
		$('#nextButton').text('Restart Tutorial');
		$('#nextButton').removeClass('pulse');
		$('#doneButton').addClass('pulse');
		this.tutorialProgress=1;
	},
	proceed: function(){
		switch(this.tutorialProgress){
			case 1:
				this.toggleElements.sidebar.show();
				this.toggleElements.header.hide();
				this.toggleElements.clearMasks();
				this.tutorialProgress++;

				/*Place at start of tutorial*/
				this.restartInteractiveHelp();
				break;

			case 2:
				this.toggleElements.sidebar.hide();
				this.toggleElements.header.show();
				this.tutorialProgress++;

				/*Place at end of tutorial*/
				this.lastSlide();
				break;

			default:
				break;

		}
	},
	closeTutorial: function(){
		var helperMask 		= $('.helperMask'),
			sidebar 				= $('.sidebar'),
			helperActions 	= $('.helperActions'),
			appendableMasks = $('.appendableMask');


		this.tutorialProgress=1;
		this.toggleElements.sidebar.hide();
		this.toggleElements.header.hide();

		// Hotfix to reset buttons
		$('#nextButton').text('Next');
		$('#nextButton').addClass('pulse');
		$('#doneButton').removeClass('pulse');

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
