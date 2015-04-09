module.exports = function (params) {
    var ACTIONS = require('../../constants/constants').ACTIONS;
    var router = params.router;

    var SensorPing = require('./sensorPing');
    var sensorPing = new SensorPing(params);

    router.on(ACTIONS.SENSOR_PING, [
        sensorPing.handleSensorPing1,
        sensorPing.handleSensorPing2,
        sensorPing.handleSensorPing3
    ]);
};