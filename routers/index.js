/**
 * Created by User on 07.04.2015.
 */

var RESPONSES = require('../constants/responseMessages');
var express = require('express');
var router = express.Router();
/*var SessionHandler = require('../handlers/sessions');
var UserHandler = require('../handlers/users');*/

module.exports = function (app) {
    'use strict';
    var logWriter = require('../helpers/logWriter')();
    

    function notFound(req, res, next) {
        res.status(404);

        if (req.accepts('html')) {
            return res.send(RESPONSES.PAGE_NOT_FOUND);
        }

        if (req.accepts('json')) {
            return res.json({error: RESPONSES.PAGE_NOT_FOUND});
        }

        res.type('txt');
        res.send(RESPONSES.PAGE_NOT_FOUND);
    }

    function errorHandler(err, req, res, next) {
        var status = err.status || 500;

        if (process.env.NODE_ENV === 'production') {
            if ((status === 401) || (status === 403)) {
                logWriter.log('', err.message + '\n' + err.stack);
            }
            res.status(status).send(err.message);

        } else {
            if ((status !== 401) && (status !== 403)) {
                logWriter.log('', err.message + '\n' + err.stack);
            }
            res.status(status).send(err.message + '\n' + err.stack);
        }

        if ((status === 401) || (status === 403)) {
            console.warn(err.message);
        } else {
            console.error(err.message);
            console.error(err.stack);
        }

        next();
    }

    app.use(notFound);
    app.use(errorHandler);

};
