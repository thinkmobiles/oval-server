module.exports = function (params) {
    this.handleSensorPing1 = function (con, next) {
        console.log('>>>>>>>>>>>>> handleSensorPing1');
        next();
    };

    this.handleSensorPing2 = function (con, next) {
        console.log('>>>>>>>>>>>>> handleSensorPing2');
        next();
    };

    this.handleSensorPing3 = function (con, next) {
        console.log('>>>>>>>>>>>>> handleSensorPing3');
        next();
    }
};