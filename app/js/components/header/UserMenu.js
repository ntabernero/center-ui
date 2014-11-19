'use strict';

var React = require('react');
var { Navigation, CurrentPath } = require('react-router');
var ActiveState = require('../../mixins/ActiveStateMixin');
var ProfileStore = require('../../stores/ProfileStore');
var {Link} = require('react-router');

var UserMenu = React.createClass({

    mixins: [ Navigation, CurrentPath, ActiveState ],

    render: function () {
        var isAdmin = ProfileStore.isAdmin();

        /*jshint ignore:start */
        return (
            <div id="user-menu" className="dropdown navbar-right">
                <a className="btn dropdown-toggle" data-toggle="dropdown" href="#">
                    <i className="fa fa-bars"></i>
                </a>
                <ul className="dropdown-menu" role="menu">
                    <li><Link to="edit"><i className="fa fa-plus"></i> Create Listing</Link></li>
                    <li><a href="#user-management/my-listings"><i className="fa fa-list"></i> My Listings</a></li>
                    {
                        isAdmin &&
                            <li><a href="#mall-management/categories"><i className="fa fa-wrench"></i> AppsMall Management</a></li>
                    }
                    <li><a href={ LOGOUT_URL }><i className="fa fa-sign-out"></i> Logout</a></li>
                </ul>
            </div>
        );
        /*jshint ignore:end */
    }

});

module.exports = UserMenu;
