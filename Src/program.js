var proxyHelper = require("./proxyHelper.js");
var collectProxyServer = require("./collectProxyServer.js");

var proxyFileName = "proxy.txt";
var connectUrl;

if (process.argv[2]) {
    connectUrl = process.argv[2];
}

collectProxyServer.saveProxy(proxyFileName, function(proxyFile) {
    proxyHelper.findProxy(proxyFile, connectUrl); 
});