'use strict';

var Cortex        = require('cortexjs'),
    Defaults      = require('../../../utils/defaults'),
    Simple        = require('./simple'),
    Contact       = require('./contact'),
    Resource      = require('./resource'),
    Screenshot    = require('./screenshot');

var arr = Defaults.arr,
    str = Defaults.str,
    obj = Defaults.obj;

module.exports = new Defaults({
    categories: arr(Simple),
    agency: Simple,
    contacts: arr(Contact),
    descriptionShort: str(),
    requirements: str(),
    description: str(),
    docUrls: arr(Resource),
    imageLargeUrl: str(),
    imageMediumUrl: str(),
    imageSmallUrl: str(),
    imageXlargeUrl: str(),
    launchUrl: str(),
    owfProperties: obj({
        intents: arr(str()),
    }),
    owners: arr(Simple),
    screenshots: arr(Screenshot),
    tags: arr(str()),
    title: str(),
    types: Simple,
    versionName: str(),
    whatIsNew: str()
});
