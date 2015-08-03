var http = require("http");
var fs = require("fs");

var cheerio = require("cheerio");

var stringUtil = require("./stringUtils.js");

var urls = [
    "http://www.proxynova.com/proxy-server-list/country-us/",
    "http://www.proxynova.com/proxy-server-list/country-gb/",
    "http://www.proxynova.com/proxy-server-list/country-th/"
];

// 将可用代理服务器写入代理文件
function saveProxy(proxyFile, callback) {
    resetFile(proxyFile);
    var completeCount = 0;

    for (var index in urls) {
        var url = urls[index];

        if (!url) {
            return;
        }

        http.get(url, function(response) {
            var responseBody = "";

            response.setEncoding("utf8");
            response.on("data", function(data) {
                responseBody += data;
            });

            response.on("end", function() {
                var $ = cheerio.load(responseBody);
                var $trs = $("#tbl_proxy_list tbody tr");
                var strProxy = "";

                completeCount++;

                for (var i = 0; i < $trs.length; i++) {
                    var $tr = $trs.eq(i);
                    var $tds = $tr.find("td");

                    if ($tds.length === 1) {
                        continue;
                    }

                    var ip = stringUtil.trim($tds.eq(0).text());
                    var port = stringUtil.trim($tds.eq(1).text());

                    strProxy += ip + ":" + port + "\r\n";
                };

                fs.appendFile(proxyFile, strProxy);

                if (completeCount == urls.length) {
                    console.log("写入代理完成");

                    if (typeof callback === "function") {
                        callback(proxyFile);
                    }
                }
            }); // end of response.on("end", function() {
        }); // end of http.get(url, function(response) {
    } // end of for (var index in urls) {
} // end of function saveProxy(proxyFile, callback) {

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