'use strict';

var React = require('react');
var Tab = require('../../../mixins/TabMixin');
var { Link, RouteHandler } = require('react-router');
var SystemStateMixin = require('../../../mixins/SystemStateMixin');
var _ = require('../../../utils/_');

// component dependencies
var Header = require('../../header');

var ListingManagement = React.createClass({

    mixins: [ Tab, SystemStateMixin ],

    getDefaultProps: function () {
        return {
            tabs: [{
                to: 'recent-activity',
                name: 'Recent Activity'
            }, {
                to: 'all-listings',
                name: 'All AML Listings'
            }, {
                to: 'my-listings',
                name: 'My Listings'
            }]
        };
    },

    render: function () {
        var tabs = _.cloneDeep(this.props.tabs);
        if(!this.state.currentUser.isAdmin){
            tabs.splice(1, 1);
        }
        /* jshint ignore:start */
        return (
            <div className="ListingManagement">
                <Header />
                <div className="ListingManagement__body">
                    <h1>Listing Management</h1>
                    <Link to="edit"><button type="button" className="btn btn-primary ListingManagement__CreateListingButton">Create New Listing</button></Link>
                    <div className="ListingManagement__TabContainer">
                        { this.renderTabs(tabs) }
                        <div className="tab-content">
                            <RouteHandler />
                        </div>
                    </div>
                </div>
            </div>
        );
        /* jshint ignore:end */
    }

});

module.exports = ListingManagement;
module.exports.MyListings = require('./MyListings');
module.exports.RecentActivity = require('./RecentActivity');
