'use strict';

var React = require('react');
var Reflux = require('reflux');
var { Navigation, RouteHandler } = require('react-router');

var State = require('../../mixins/ActiveStateMixin');
var Tab = require('../../mixins/TabMixin');
var _ = require('../../utils/_');

// component dependencies
var Modal = require('../shared/Modal');
var IconRating = require('../shared/IconRating');
var Header = require('./Header');
var { UserRole } = require('../../constants');
var CurrentListingStore = require('../../stores/CurrentListingStore');
var { loadListing } = require('../../actions/CreateEditActions');

var OverviewTab = require('./OverviewTab');
var ReviewsTab = require('./ReviewsTab');
var DetailsTab = require('./DetailsTab');
var ResourcesTab = require('./ResourcesTab');
var AdministrationTab = require('./AdministrationTab');

var tabs = {
    'overview': OverviewTab,
    'reviews': ReviewsTab,
    'details': DetailsTab,
    'resources': ResourcesTab,
    'administration': AdministrationTab
};

/**
*
* Quickview Component.
* Displays listing info in a modal window.
*
**/
var Quickview = React.createClass({

    mixins: [ Reflux.connect(CurrentListingStore), Navigation, State ],

    getDefaultProps: function () {
        return {
            tabs: [{
                to: 'overview',
                name: 'Overview'
            }, {
                to: 'details',
                name: 'Details'
            }, {
                to: 'resources',
                name: 'Resources'
            }]
        };
    },

    getInitialState: function () {
        return {shown: false};
    },

    render: function () {

        var currentUser = this.props.currentUser;

        var { shown, listing } = this.state;
        var ActiveRouteHandler = this.getActiveRouteHandler();
        var owners, tabs;

        if (listing) {
            tabs = _.cloneDeep(this.props.tabs);
            owners = listing.owners.map(function (owner) {
                return owner.username;
            });

            if (!this.props.preview) {
                tabs.splice(1, 0, {
                    to: 'reviews',
                    name: 'Reviews'
                });

                if (currentUser.isAdmin || _.contains(owners, currentUser.username) ||
                    _.contains(currentUser.stewardedOrganizations, listing.agency)) {
                    tabs.push({
                        to: 'administration',
                        name: 'Administration'
                    });
                }
            }
        }

        var headerProps = {
            listing: listing,
            onCancel: this.close,
            onEdit: this.edit,
            currentUser: currentUser,
            preview: this.props.preview,
            allowEdit: CurrentListingStore.currentUserCanEdit()
        };

        /* jshint ignore:start */
        return this.transferPropsTo(
            <Modal ref="modal" className="quickview" onShown={this.onShown} onHidden={this.onHidden}>
                {
                    !listing ?
                        <p>Loading...</p> :
                        [
                            <Header { ...headerProps }></Header>,
                            <div className="tabs-container">
                                { this.renderTabs(tabs, listing.id) }
                                <div className="tab-content">
                                    <ActiveRouteHandler currentUser={currentUser} listing={listing} shown ={shown} />
                                </div>
                            </div>
                        ]
                }
            </Modal>
        );
        /* jshint ignore:end */
    },

    getActiveRouteHandler: function () {
        var tab = tabs[this.props.tab];
        if (!tab) {
            throw new Error('Unknown tab.');
        }
        return tab;
    },

    renderTabs: function (links, id) {
        var me = this;

        /* jshint ignore:start */
        var linkComponents = links.map(function (link) {
            var className = link.to === me.props.tab ? 'active' : '';
            var href = me.makeHref(me.getActiveRoutePath(), me.getParams(), {
                listing: id,
                action: me.props.preview ? 'preview' : 'view',
                tab: link.to
            });

            return (
                <li className={className} key={link.to}>
                    <a href={href}>{link.name}</a>
                </li>
            );
        });

        return (
            <ul className="nav nav-tabs" role="tablist">
                {linkComponents}
            </ul>
        );
        /* jshint ignore:end */
    },

    componentWillMount: function () {
        if (!this.props.preview) {
            CurrentListingStore.loadListing(this.props.listingId);
        }
    },

    componentWillReceiveProps: function (newProps) {
        if (!this.props.preview && (this.props.listingId !== newProps.listingId)) {
            CurrentListingStore.loadListing(newProps.listingId);
        }
    },

    onShown: function () {
        // dont force focus causes infinite loop with overview tab's modal carousel
        $(document).off('focusin.bs.modal');

        this.setState({
            shown: true
        });
    },

    onHidden: function () {
        if(!this.state.toEdit) {
            // go back to the parent route
            this.transitionTo(this.getActiveRoutePath(), this.getParams());
        }
    },

    close: function () {
        this.refs.modal.close();
    },

    edit: function () {
        var listing = this.state.listing;
        this.setState({toEdit: true});
        this.close();
        this.transitionTo('edit', {listingId: listing.id});
    }

});

module.exports = Quickview;
module.exports.OverviewTab = OverviewTab;
module.exports.ReviewsTab = ReviewsTab;
module.exports.DetailsTab = DetailsTab;
module.exports.ResourcesTab = ResourcesTab;
module.exports.AdministrationTab = AdministrationTab;
