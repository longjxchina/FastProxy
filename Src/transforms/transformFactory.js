function createTransform(type) {
    return require("./" + type);
}

module.exports = {
    create: createTransform
}