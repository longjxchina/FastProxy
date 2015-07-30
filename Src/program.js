var http = require("http");
var cheerio = require("cheerio");
var fs = require("fs");
var path = require("path");
var stringUtil = require("./stringUtils.js");
var url = "http://www.proxynova.com/proxy-server-list/country-us/";
var proxyFileName = "proxy.txt";
var proxyHelper = require("./proxyHelper.js");
// var baseDir = path.dirname(require.main.filename);

http.get(url, function(response){
    var responseBody = "";

    response.setEncoding("utf8");
    response.on("data", function(data) {
        responseBody += data;
    });

    response.on("end", function() {
        var $ = cheerio.load(responseBody);
        var $trs = $("#tbl_proxy_list tbody tr");        
        var strProxy = "";

        for (var i = 0; i < $trs.length; i++) {
            var $tr = $trs.eq(i);
            var $tds = $tr.find("td");

            if($tds.length === 1) {
                continue;
            }

            var ip = stringUtil.trim($tds.eq(0).text());
            var port = stringUtil.trim($tds.eq(1).text());

            strProxy += ip + ":" + port + "\n";
        };

        fs.writeFile(proxyFileName, strProxy);

        proxyHelper.findProxy(proxyFileName);
    });
});