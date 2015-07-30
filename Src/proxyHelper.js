var proxyChecker = require("proxy-checker");

function findProxy(proxyFile) {
    proxyChecker.checkProxiesFromFile(
        // The path to the file containing proxies 
        proxyFile, {
            // the complete URL to check the proxy 
            url: 'https://mail.google.com'
        },
        // Callback function to be called after the check 
        function(host, port, ok, statusCode, err) {
            console.log((ok ? "成功" : "失败") + " => " + host + ':' + port + ' => ' + ' (status: ' + statusCode + ', err: ' + err + ')');
        }
    );
}

module.exports = {
    findProxy: findProxy
}