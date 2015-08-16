var cheerio = require("cheerio");
var stringUtil = require("./../stringUtils.js");

function proxynovaTransfrom() {

}

proxynovaTransfrom.prototype.transform = function (source) {
    var $ = cheerio.load(source);
    var $trs = $("#tbl_proxy_list tbody tr");
    var proxys = [];

    for (var i = 0; i < $trs.length; i++) {
        var $tr = $trs.eq(i);
        var $tds = $tr.find("td");

        if ($tds.length === 1) {
            continue;
        }

        var ip = stringUtil.trim($tds.eq(0).text());
        var port = stringUtil.trim($tds.eq(1).text());

        proxys.push({ip: ip, port: port});
    };

    return proxys;
}

module.exports = proxynovaTransfrom;