var config = {};

config.apiKeys = {
    sl_realtid: "xxxxxxxx",
}
config.web = {};
config.web.port = process.env.WEB_PORT || 8000;

module.exports = config;