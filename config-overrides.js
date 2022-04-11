const { ModuleFederationPlugin } = require('webpack').container;
const dependencies = require('./package.json').dependencies;

const remotes = {
  tableRow: {
    url: 'https://test-mf-elodie-cra.s3.eu-west-3.amazonaws.com/remoteEntry.js',
    federatedModules: ['TableRow'],
  },
};

const pattern = Object.entries(remotes).reduce((acc, federatedApp) => {
  federatedApp[1].federatedModules.forEach((module) => {
    acc.push(federatedApp[0] + '/' + module);
  });
  return acc;
}, []);

const shared = {
  ...dependencies,
  'react-redux': {
    singleton: true,
  },
  react: {
    requiredVersion: dependencies['react'],
    singleton: true,
  },
  'react-dom': {
    requiredVersion: dependencies['react-dom'],
    singleton: true,
  },
};

function buildRemotes(mfConf) {
  return Object.entries(mfConf.remotes || {}).reduce(
    (acc, [remoteName]) => ({
      ...acc,
      [remoteName]: `internal ${remoteName}`,
    }),
    {}
  );
}

module.exports = function override(config, env) {
  console.log(config);
  config.entry = {
    main: './src/index.tsx',
  };
  config.externals = [
    function ({ context, request }, callback) {
      const addModulesToContainer = `function addModulesToContainer(container, moduleId) {
        return new Promise(async (resolve, reject) => {
          const factory = await container.get('./' + moduleId);
          const mod = factory();
          container[moduleId] = mod && mod.default ? mod.default : mod;
          resolve(mod && mod.default ? mod.default : mod);
        });
      }`;
      if (pattern.includes(request)) {
        const federatedAppName = request.split('/')[0];
        return callback(
          null,
          `promise new Promise((resolve) => {
          const [federatedAppName, federatedModule] = "${request}".split('/');
          ${addModulesToContainer}
          if (window[federatedAppName]) {
            return addModulesToContainer(window[federatedAppName], federatedModule).then((module) =>
              resolve(module)
            );
          }
          const script = document.createElement('script');
          document.body.appendChild(script);
          script.onload = async () => {
            await window[federatedAppName].init(window.shareScope.default);
            addModulesToContainer(window[federatedAppName], federatedModule)
            .then((module) => resolve(module));
          };
          script.src = "${remotes[federatedAppName].url}";
        });`
        );
      }
      return callback();
    },
  ];
  // config.externals.push(buildClientExternals({ remotes }));
  config.plugins.push(
    new ModuleFederationPlugin({
      // options' typings in typescript
      name: 'Shell',
      remotes: buildRemotes({ remotes }),
      shared,
    })
  );
  return config;
};
