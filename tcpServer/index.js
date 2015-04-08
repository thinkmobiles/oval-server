'use strict';
module.exports = function (params) {
    var net = require('net');
    var server = null;
    var port = params.port || 13000;
    var Router = require('./router');
    var router = new Router();
    var self = this;

    // statistics
    this.get = 0; // total get pkg
    this.drop = 0; // dropped pkg (not valid size)
    this.send = 0; // total send pkg (not realizet yet)
    this.connects = 0; // total connect counter NOT LIVE!
    this.disconncts = 0; // disconnected gateways
    this.connectionErrors = 0; // not normal end connections
    // statistics


    console.log(router);

    function startServer() {
        server.listen(port, function () {
            console.log('TCP >>> server bound on port: ' + port);
        });
    }

    server = net.createServer(function (socket) {
        self.connects++;
        console.log('TCP >>> client connected');

        socket.write('hello\r\n');

        socket.on('end', function (d) {
            console.log('TCP >>> END disconnected', d);
        });
        socket.on('error', function (d) {
            self.connectionErrors++;
            console.log('TCP >>> ERROR client disconnected', d);
        });
        socket.on('close', function (d) {
            self.disconncts++;
            console.log('TCP >>> CLOSED client disconnected', d);
        });
        //c.pipe(c);
        socket.on('data', function (data) {

            console.log('TCP >>> get data:', data.toString(), '==>', data);

            self.get++;
            switch (socket.length) {
                case 24:
                    router.exec(socket, data);

                default:
                    self.drop++;
                    break;
            }
        });
    });

    server.on('error', function (e) {
        if (e.code == 'EADDRINUSE') {
            console.log('TCP >>> Address in use, retrying...');
            setTimeout(function () {
                server.close();
                startServer();
            }, 1000);
        }
    });

    startServer();
};


//var net = require('net');
//var server = net.createServer(function (c) {
//
//    console.log('client connected');
//
//    c.write('hello\r\n');
//
//    c.on('end', function (d) {
//        console.log('END disconnected', d);
//    });
//    c.on('error', function (d) {
//        console.log('ERROR client disconnected', d);
//    });
//    c.on('close', function (d) {
//        console.log('CLOSED client disconnected', d);
//    });
//    //c.pipe(c);
//    c.on('data', function (data) {
//        console.log('==>', data.toString(), '==>', data);
//    });
//});
//server.listen(8124, function () {
//    console.log('server bound');
//});