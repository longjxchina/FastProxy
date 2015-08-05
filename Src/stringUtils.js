function trim(str) {
    if (str == null) return;
    var s = str;
    var k = s.replace(/^\s+/, "");
    var k = k.replace(/\s+$/, "");
    return k;
}

function formatDate(date, fmt)

{ //author: meizz   

    var theDate = date;
    var o = {

        "M+": theDate.getMonth() + 1, //月份   

        "d+": theDate.getDate(), //日   

        "h+": theDate.getHours(), //小时   

        "m+": theDate.getMinutes(), //分   

        "s+": theDate.getSeconds(), //秒   

        "q+": Math.floor((theDate.getMonth() + 3) / 3), //季度   

        "S": theDate.getMilliseconds() //毫秒   

    };

    if (/(y+)/.test(fmt))

        fmt = fmt.replace(RegExp.$1, (theDate.getFullYear() + "").substr(4 - RegExp.$1.length));

    for (var k in o)

        if (new RegExp("(" + k + ")").test(fmt))

            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;

}


module.exports = {
    trim: trim,
    formatDate: formatDate
}