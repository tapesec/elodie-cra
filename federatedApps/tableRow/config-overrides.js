const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../package.json').dependencies;

module.exports = function override(config, env) {
  config.output = {
    ...config.output,
    publicPath: 'auto',
  };
  config.optimization = undefined;
  config.mode = 'development';
  config.plugins.push(
    new ModuleFederationPlugin({
      // options' typings in typescript
      // runtime: 'table-row-chunck',
      name: 'TableInvoices',
      filename: 'remoteEntry.js',
      exposes: {
        './RowInvoice': '../src/tableInvoices/ListRowInvoice.tsx',
      },
      shared: {
        ...deps,
        'react-redux': {
          singleton: true,
        },
        react: {
          strictVersion: true,
          requiredVersion: deps['react'],
          singleton: true,
        },
        'react-dom': {
          strictVersion: true,
          requiredVersion: deps['react-dom'],
          singleton: true,
        },
      },
    })
  );
  return config;
};
