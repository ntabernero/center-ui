'use strict';

var React = require('react');
var _IconRating = require('../../../../node_modules/react-icon-rating/index.jsx');

var IconRating = React.createClass({

    displayName: 'IconRatingExtended',

    getDefaultProps: function () {
        return {
            className: 'icon-rating',
            toggledClassName: 'fa fa-star',
            untoggledClassName: 'fa fa-star-o',
            halfClassName: 'fa fa-star-half-o'
        };
    },

    render: function () {
        /* jshint ignore:start */
        return this.transferPropsTo(
            <_IconRating
                className={ this.props.className }
                toggledClassName={ this.props.toggledClassName }
                untoggledClassName={ this.props.untoggledClassName }
                halfClassName={ this.props.halfClassName } />
        );
        /* jshint ignore:end */
    }

});

module.exports = IconRating;
