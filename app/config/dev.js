const cells_properties = require('./common/common.js');

const appConfig = {
  /**
   * Properties used to control settings of Cells Bridge and the build process
   */
  cells_properties,

  /**
   * These properties are specific to your application.
   * Here you can use your own properties, so it is an
   * open set of properties that you can use at your
   * convenience.
   * These variables will be available in your
   * application ins the window.AppConfig object
   */
  app_properties: {
    mock: true,
    armadilloLogin: {
      host: 'https://artichoke.platform.bbva.com',
      consumerId: '10000033'
    }
  },
};

module.exports = appConfig;
