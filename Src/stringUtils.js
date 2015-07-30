function trim(str) {
    if (str == null) return;
    var s = str;
    var k = s.replace(/^\s+/, "");
    var k = k.replace(/\s+$/, "");
    return k;
}

module.exports = {
    trim: trim
}