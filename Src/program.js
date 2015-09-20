var proxyHelper = require("./proxyHelper.js");
var collectProxyServer = require("./collectProxyServer.js");
var stringUtil = require("./stringUtils.js");
var fs = require("fs");

var proxyFileName = "proxy.txt";
var connectUrl;

if (process.argv[2]) {
    connectUrl = process.argv[2];
}

collectProxyServer.saveProxy(proxyFileName, function(proxyFile) {
    fs.stat(proxyFileName, function(err, status) {
        if (err) {
            console.log(stringUtil.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + "\t未获取到代理服务器");
        }
        else {
            proxyHelper.findProxy(proxyFile, connectUrl);
            console.log(stringUtil.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + "\t连接代理服务器完成");
        }
    })
});