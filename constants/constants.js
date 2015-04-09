module.exports = {
    ACTIONS: {
        SENSOR_PING: 'sensorPing', // 0xA0 or 160
        SENSOR_PING_RESPONSE: 'sensorPingRes', // 0xB1 or 177
        GATEWAY_PING: 'gatewayPing', // 0xF1 or 241
        GATEWAY_PING_RESPONSE: 'gatewayPing', // 0xF2 or 242
        GATEWAY_BOOT_RESET: 'gatewayFirstBootReset', // 0xF0 or 240
        GATEWAY_BOOT_RESET_RESPONSE: 'gatewayFirstBootReset', // 0xF1 or 241
        GATEWAY_LOST_SENSOR: 'gatewayLostSensor', //0xF4 or 244
        GATEWAY_LOST_SENSOR_RESPONSE: 'gatewayLostSensorResponse' //0xF5 245
    },

    ACTION_CODES: {
        SENSOR_PING: 160, // 0xA0
        SENSOR_PING_RESPONSE: 177, // 0xB1
        GATEWAY_PING: 241, // 0xF1
        GATEWAY_PING_RESPONSE: 242, // 0xF2
        GATEWAY_BOOT_RESET: 240, // 0xF0
        GATEWAY_BOOT_RESET_RESPONSE: 241, // 0xF1
        GATEWAY_LOST_SENSOR: 244, //0xF4
        GATEWAY_LOST_SENSOR_RESPONSE: 245 //0xF5
    }
};