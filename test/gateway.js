'use strict';
var net = require('net');

describe('>>>> TCP server tests', function () {
    it('one heart beet test', function (done) {
        var message = new Buffer([0x4D, 0x44, 0x69, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x55, 0xAA, 0xFF]);


        var client = net.connect({port: 13000},
            function () { //'connect' listener
                console.log('GATEWAY >>> connected to server!');
                client.write(message);
            });
        client.on('data', function (data) {
            console.log('GATEWAY >>> servers sends:', data.toString());
            client.end();
        });
        client.on('end', function () {
            console.log('GATEWAY >>> disconnected from server');
        });
        client.on('error', done);
    });
});