const { ModuleFederationPlugin } = require('webpack').container;
const dependencies = require('./package.json').dependencies;

module.exports = function override(config, env) {
  console.log(config);
  config.entry = {
    main: './src/index.tsx',
  };
  config.plugins.push(
    new ModuleFederationPlugin({
      // options' typings in typescript
      name: 'Shell',
      remotes: {
        tableRow: 'tableRow@https://test-mf-elodie-cra.s3.eu-west-3.amazonaws.com/remoteEntry.js',
      },
      shared: {
        ...dependencies,
        'react-redux': {
          singleton: true,
        },
        react: {
          singleton: true,
        },
        'react-dom': {
          singleton: true,
        },
      },
    })
  );
  console.log(env, 'env');
  return config;
};
