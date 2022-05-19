const PLUGIN_NAME = 'FederatedModuleImportPlugin';
const path = require('path');
const { CachedInputFileSystem, ResolverFactory } = require('enhanced-resolve');
const fs = require('fs');

/**
 * The goal of this plugin is to allow developers override base files by more
 * specific ones based on environment variables.
 *
 * It will be used to override components for the B2B version of the website or
 * for a given platform without making the initial components bigger.
 *
 * It's a fork of the NormalModuleReplacementPlugin webpack plugin.
 */
class FederatedModuleImportPlugin {
  /**
   * @param {string[]} suffixes List of suffixes to handle (without '.').
   */
  constructor(exposedFederatedModules) {
    // this.exposedFederatedModules = exposedFederatedModules;
    this.exposedFederatedModules = {
      TableInvoices: {
        directoryPath: 'src/tableInvoices',
        federatedModules: {
          './RowInvoice': 'ListRowInvoice.tsx',
        },
      },
    };
  }

  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (normalModuleFactory) => {
      normalModuleFactory.hooks.beforeResolve.tapAsync(PLUGIN_NAME, (result, callback) => {
        //try {
        const currentFilePath = result.contextInfo.issuer;
        if (!currentFilePath || !result.request) return callback();
        for (let appName in this.exposedFederatedModules) {
          const app = this.exposedFederatedModules[appName];
          if (
            !currentFilePath.includes(path.resolve(__dirname, app.directoryPath)) &&
            !currentFilePath.includes('node_modules')
          ) {
            const myResolver = ResolverFactory.createResolver({
              fileSystem: new CachedInputFileSystem(fs, 4000),
              modules: [
                'node_modules',
                '/Users/lionnel.dupouy/devProjects/elodie-cra/node_modules',
              ],
              extensions: [
                '.web.mjs',
                '.mjs',
                '.web.js',
                '.js',
                '.web.ts',
                '.ts',
                '.web.tsx',
                '.tsx',
                '.json',
                '.web.jsx',
                '.jsx',
              ],
            });
            myResolver.resolve({}, result.context, result.request, {}, (err, filePath) => {
              const fedModuleToImportIndex = Object.entries(app.federatedModules)
                .map((modules) => {
                  return path.resolve(app.directoryPath, modules[1]);
                })
                .indexOf(filePath);
              if (fedModuleToImportIndex !== -1) {
                console.log(filePath, 'filePath');
                console.log('---------- FIND SOMETHING ------------');
                console.log(result.request, 'request before …');
                const selectedFedModuleConfig = Object.entries(app.federatedModules)[
                  fedModuleToImportIndex
                ];
                result.dependencies[0].request = `${appName}/${
                  selectedFedModuleConfig[0].split('./')[1]
                }`.split('.tsx')[0];
                console.log(result.dependencies[0].request, 'request after …');
              }
              callback();
            });
          } else {
            callback();
          }
        }
        /*} catch (error) {
          console.log(error);
        }*/
      });
    });

    /*
    compiler.hooks.normalModuleFactory.tap(PLUGIN_NAME, (normalModuleFactory) => {
      normalModuleFactory.hooks.beforeResolve.tap(PLUGIN_NAME, (resolveData) => {
        if (!resolveData.context || !resolveData.request)
          throw new Error('Can’t resolve the dependency request');
        const resource = path.resolve(resolveData.context, resolveData.request);
        console.log(resolveData, 'resolve data ------->');
      });
    });*/
  }
}

module.exports = { FederatedModuleImportPlugin };
