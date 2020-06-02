cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-calendar.Calendar",
      "file": "plugins/cordova-plugin-calendar/www/Calendar.js",
      "pluginId": "cordova-plugin-calendar",
      "clobbers": [
        "Calendar"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-calendar": "5.1.5"
  };
});