/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '',
      database: 'zshop-api',
    },
  };

  return {
    ...config,
  };
};
