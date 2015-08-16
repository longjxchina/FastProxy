var cheerio = require("cheerio");
var stringUtil = require("./../stringUtils.js");

function pachongTransform() {

}

pachongTransform.prototype.transform = function (source) {
    var $ = cheerio.load(source);
    var $trs = $(".mainWap > .tb tbody tr");
    var proxys = [];

    for (var i = 0; i < $trs.length; i++) {
        var $tr = $trs.eq(i);
        var $tds = $tr.find("td");

        if ($tds.length === 1) {
            continue;
        }

        var ip = stringUtil.trim($tds.eq(1).text());
        var port = stringUtil.trim($tds.eq(2).text());

        proxys.push({ip: ip, port: port});
    };

    return proxys;
}

module.exports = pachongTransform;