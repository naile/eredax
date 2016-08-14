var config = {};

config.apiKeys = {
    sl_realtid: "xxxxxxxx",
}
config.slApiUrl = 'http://api.sl.se/api2';
config.cacheTtl = 10000; //ms
config.enableCache = true;
config.web = {};
config.web.port = process.env.PORT || 8000;

module.exports = config;