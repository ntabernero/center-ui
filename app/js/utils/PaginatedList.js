'use strict';

class PaginatedList {
    constructor (paginatedResponse) {
        this.nextLink = paginatedResponse.nextLink();
        this.total = paginatedResponse.total;
        this.data = paginatedResponse.getItemAsList();
        this.hasMore = !!this.nextLink;
        this.isFetching = false;
        this.counts = paginatedResponse.getResponse().counts;
    }

    receivePage (paginatedResponse) {
        this.nextLink = paginatedResponse.nextLink();
        this.data = this.data.concat(paginatedResponse.getItemAsList());
        this.hasMore = !!this.nextLink;
        this.isFetching = false;
        this.counts = paginatedResponse.getResponse().counts;
    }

    expectPage () {
        this.isFetching = true;
    }
}

module.exports = PaginatedList;
