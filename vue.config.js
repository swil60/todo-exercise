'use strict';

const path = require('path');
const DataHub = require('macaca-datahub');
const datahubProxyMiddle = require('datahub-proxy-middleware');

const datahubConfig = {
  port: 5678,
  hostname: '127.0.0.1',
  store: path.join(__dirname, 'data'),
  proxy: {
    '/api': {
      hub: 'sample'
    }
  },
  showBoard: true,
};

const defaultDatahub = new DataHub({
  port: datahubConfig.port
});

module.exports = {
  configureWebpack: {
	  devServer: {
	    before: app => datahubProxyMiddle(app)(datahubConfig),
	    after: () => {
	      defaultDatahub.startServer(datahubConfig).then(() => {
	        console.log('datahub ready');
	      });
	    }
	  }
	}
};
