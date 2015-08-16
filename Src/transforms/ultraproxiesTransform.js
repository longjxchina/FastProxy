var cheerio = require("cheerio");
var stringUtil = require("./../stringUtils.js");

function ultraproxiesTransform() {

}

ultraproxiesTransform.prototype.transform = function (source) {
    var $ = cheerio.load(source);
    var $trs = $("table.proxy").eq(1).find("tr");
    var proxys = [];

    for (var i = 0; i < $trs.length; i++) {
        var $tr = $trs.eq(i);
        var $tds = $tr.find("td");

        if ($tds.length === 1) {
            continue;
        }

        var ip = stringUtil.trim($tds.eq(0).text()).replace(":", "");
        var encodePort = stringUtil.trim($tds.eq(1).text());
        var port = "";
        var portVals = encodePort.split("-");

        if (!ip || ip == "127.0.0.1") {
            continue;
        }

        for(var j = 0; j < portVals.length; j++) {
            portVals[j] -= 65;
            port += portVals[j];
        }

        proxys.push({ip: ip, port: port});
    };

    return proxys;
}

module.exports = ultraproxiesTransform;