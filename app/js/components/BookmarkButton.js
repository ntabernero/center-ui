'use strict';

var React = require('react');
var Reflux = require('reflux');

var _ = require('../utils/_');

var ProfileStore = require('../stores/ProfileStore');
var { addToLibrary, removeFromLibrary } = require('../actions/ListingActions');

var BookmarkButton = React.createClass({
    mixins: [Reflux.connect(ProfileStore)],

    propTypes: {
        listing: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {library: []};
    },

    toggleInLibrary: function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.inLibrary()) {
            removeFromLibrary(this.props.listing);
        }
        else {
            addToLibrary(this.props.listing);
        }
    },

    inLibrary: function() {
        return !!_.find(this.state.library, e => e.listing.id === this.props.listing.id);
    },

    render: function() {
        var bookmarkBtnStyles = React.addons.classSet({
                'btn btn-default btn-bookmark': true,
                'bookmarked': this.inLibrary()
            });
        /* jshint ignore:start */
        return (
            <button type="button" className={bookmarkBtnStyles} onClick={this.toggleInLibrary}>
                <i className="fa fa-bookmark"/>
            </button>
        );
        /* jshint ignore:end */
    }
});

module.exports = BookmarkButton;
