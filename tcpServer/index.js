module.exports = function (params) {
    var TcpServer = require('./tcpServer');
    var tcpServer = new TcpServer(params);
    params.router = tcpServer.router;

    require('./handlers')(params);

    return tcpServer;
};