'use strict';
module.exports = function () {
    var self = this;
    var util = require('util');
    var Con = require('./connection');

    this.errorCallback = function () {
    }; // error handler

    var routs = [];

    this.exec = function (socket, data) { // get the connection and data porthion and start routing
        console.log('== router exec ==');
        var con = new Con({
            con: con,
            data: data,
            router: self,
            socket: socket
        });

        if (con.action === null) {
            return self.error(new Error('invalid pkg'), con);
        }

        if (!routs[con.action]) {
            return self.error(new Error('do not have handler fot action "' + con.action + '"'), con);
        }

        var gid = new Gid(con, routs[con.action]); // add to processing in routs stack;

        return this;
    };

    this.on = function (action, callback) { // add a callback or array of callbacks for action;
        checkAction(action);
        if (typeof callback === 'function') {
            routs[action].functions.push(callback)
        }
        if (util.isArray(callback)) {
            routs[action].functions = routs[action].functions.concat(callback);
        }
        return this;
    };

    function checkAction(action) {
        var isSet = false;
        for (var i = 0; i < routs; i++) {
            if (routs[1].name === action) {
                isSet = true;
            }
        }
        if (!isSet) {
            routs.push({name: action, functions: []})
        }
    }

    this.error = function (err, con) {
        console.error('TCP Router ERROR:', err);
        self.errorCallback(err, con);
    };

    this.onError = function (callbak) { // set error handler;
        if (callbak) {
            this.errorCallback = callbak;
        }
        return this;
    };

    function Gid(con, functions) {
        this.con = con;
        var router = self;
        var index = 0;
        var _this = this;

        this.next = function (err) {
            if (err) {
                return router.error(err);
            }
            if (con.whosResponse) {
                return router.error(new Error('already whose response'));
            }

            index++;

            if (!functions[index]) {
                return router.error(new Error('pkg not handle'));
            }

            functions[index](con, _this.next);
        };

        functions[0](con, _this.next);
    }

};