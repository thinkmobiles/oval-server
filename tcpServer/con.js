'use strict';
module.exports = function (params) {
    var router = params.router;
    this.action = null;
    this.data = params.data;
    this.whosResponse = false;
    var self = this;
    this.isError = false;

    switch (data.length) {
        case 24:
            parseHeartBeat();
            break;

    }

    function parseHeartBeat() {

    }

    this.error = function (err) {
        this.isError = err;
        router.error(err);
    }

};