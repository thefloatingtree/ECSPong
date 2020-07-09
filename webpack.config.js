module.exports = {
    "mode": "none",
    "entry": "./src/index.js",
    "output": {
        "globalObject": "this",
        "path": __dirname + '/dist',
        "filename": "index.js",
    },
    "watch": true
}