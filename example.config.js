var config = {};

config.apiKeys = {
    sl_realtid: "xxxxxxxx",
}
config.slApiUrl = 'http://api.sl.se/api2';
config.web = {};
config.web.port = process.env.PORT || 8000;

module.exports = config;