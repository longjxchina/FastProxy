var http = require("http");
var fs = require("fs");

var transformFactory = require("./transforms/transformFactory");

var stringUtil = require("./stringUtils.js");

var urls = [{
    url: "http://www.proxynova.com/proxy-server-list/country-us/",
    type: "proxynovaTransform"
}, {
    url: "http://www.proxynova.com/proxy-server-list/country-gb/",
    type: "proxynovaTransform"
}, {
    url: "http://www.proxynova.com/proxy-server-list/country-th/",
    type: "proxynovaTransform"
}, {
    url: "http://www.ultraproxies.com/index.html",
    type: "ultraproxiesTransform"
}];

var completeCount = 0;

// 将可用代理服务器写入代理文件
function saveProxy(proxyFile, callback) {
    resetFile(proxyFile);

    console.log(stringUtil.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + "\t收集代理服务器开始");

    for (var index in urls) {
        var urlObj = urls[index];

        writeProxy(proxyFile, urlObj, callback);
    } // end of for (var index in urls) {
} // end of function saveProxy(proxyFile, callback) {

function writeProxy(proxyFile, urlObj, callback) {
    var url = urlObj.url;
    var type = urlObj.type;

    var request = http.get(url, function(response) {
        var responseBody = "";

        response.setEncoding("utf8");
        response.on("data", function(data) {
            responseBody += data;
        });

        response.on("end", function() {
            completeCount++;

            var strProxy = "";
            var proxyTransform = transformFactory.create(type);
            var transform = new proxyTransform();
            var proxys = transform.transform(responseBody);

            for (var i = 0; i < proxys.length; i++) {
                var o = proxys[i];

                strProxy += o.ip + ":" + o.port + "\r\n";
            };

            fs.appendFile(proxyFile, strProxy);

            doCheck(callback);
        }); // end of response.on("end", function() {
    }).on('error', function(e) {
        completeCount++;

        console.log("获取代理出错: " + url);
        doCheck(callback);
    }); // end of http.get(url, function(response) {

    request.setTimeout(10000, function() {
        completeCount++;

        console.log("获取代理超时: " + url);
        doCheck(callback);
    });

    function doCheck(callback) {
        if (completeCount == urls.length) {
            console.log(stringUtil.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + " \t收集代理服务器完成");

            if (typeof callback === "function") {
                callback(proxyFile);
            }
        }
    }
}

function resetFile(proxyFile) {
    fs.exists(proxyFile, function(exists) {
        if (exists) {
            fs.unlink(proxyFile);
        }
    });
}

module.exports = {
    saveProxy: saveProxy
}