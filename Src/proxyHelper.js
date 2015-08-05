var proxyChecker = require("proxy-checker");

function findProxy(proxyFile, connectUrl) {
    var url =  connectUrl;

    if (!connectUrl) {
        url = "https://mail.google.com";
    }

    console.log("代理连接：" + url);

    proxyChecker.checkProxiesFromFile(
        // The path to the file containing proxies 
        proxyFile, {
            // the complete URL to check the proxy 
            url: url
        },
        // Callback function to be called after the check 
        function(host, port, ok, statusCode, err) {
            if (ok) {
                console.log((ok ? "成功" : "失败") + " => " + host + '\t' + port);
            }
        }
    );
}

module.exports = {
    findProxy: findProxy
}