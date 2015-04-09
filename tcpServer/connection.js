'use strict';
module.exports = function (params) {
    console.log('== con is created ==');

    var router = params.router;
    this.action = null;
    this.data = params.data;
    this.dataJSON = {};
    var dataJSON = {};
    this.con = params.con;
    this.whosResponse = false;
    var self = this;
    this.isError = false;
    this.params = {};
    var CODS = require('../constants/constants').ACTION_CODES;
    var ACTIONS = require('../constants/constants').ACTIONS;

    function parseHeartBeat() {
        if (!verifyPkg()) return self.error(new Error('pkg is not correct'));
        self.params.mac = self.data.readUInt32BE(4) // DEV 1-4
        self.params.sensorId = self.data.readUInt16BE(8); ///DEV 5,6
        self.params.cmd = dataJSON[12];
        self.params.batteryVoltage = dataJSON[13];
        self.params.temp = dataJSON[14]; // in celsius
        self.params.motion = dataJSON[15];
        self.params.luminosity = dataJSON[16];
        self.params.proximity = dataJSON[17];
        self.params.system = dataJSON[18];
        self.params.alarmEnabled = dataJSON[19];
        self.params.alarmTriggared = dataJSON[20];
        self.params.humidity = parseInt((125 * (self.data.readUInt16BE(10)) / 65532) - 6);


    }

    function verifyPkg() { // verification and decryption of pkg;
        //if (dataJSON[0] === 77 && dataJSON[1] === 68) {
        //    return true;
        //} else {
        //    return false;
        //}
        return true;
    }

    function setAction() {
        if (self.params.cmd === CODS.SENSOR_PING) return self.action = ACTIONS.SENSOR_PING;
        if (self.params.cmd === CODS.GATEWAY_PING) return self.action = ACTIONS.GATEWAY_PING;
        if (self.params.cmd === CODS.GATEWAY_LOST_SENSOR) return self.action = ACTIONS.GATEWAY_LOST_SENSOR;
        if (self.params.cmd === CODS.GATEWAY_BOOT_RESET) return self.action = ACTIONS.GATEWAY_BOOT_RESET;
    }

    this.error = function (err, con) {
        this.isError = err;
        router.error(err);
    };

    this.dataJSON = this.data.toJSON().data;
    dataJSON = this.dataJSON;
    console.log('==> converted pkg');
    console.log(dataJSON);

    switch (this.data.length) {
        case 24:
            parseHeartBeat();
            break;
        default:
            this.error(new Error('not match with any pkg'), this.con);
            break;
    }
    setAction();
    console.log('PARAMS', this.params);
};