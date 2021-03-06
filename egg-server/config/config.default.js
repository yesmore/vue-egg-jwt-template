/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1631350599997_6975';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  /** My plug-in configuration */
  // Disable CSRF
  config.security = {
    csrf: {
      enable: false
    }
  }

  // Enable CORS
  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH'
  }

  // Configuring the rendering engine
  config.view = {
    defaultViewEngine: 'nunjucks'
  }

  // Configuring the jwt secret
  config.jwt = {
    secret: 'yoursecret'
  }

  // Connect your db(MySQL)
  config.sequelize = {
    dialect: 'mysql',
    database: 'jwttemplate',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123',
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    }
  }

  // Configure access path
  config.static = {
    prefix: '/', // Access path
    dir: path.join(appInfo.baseDir, 'app/public') // Set static file directory
  }

  return {
    ...config,
    ...userConfig,
  };
};
