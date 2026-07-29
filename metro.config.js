const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force Metro to transpile packages that use modern class syntax (static fields, private methods)
// These are NOT transformed by default since they live in node_modules
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Force transform these packages through Babel (they use static class fields)
config.resolver.nodeModulesPaths = [require('path').resolve(__dirname, 'node_modules')];
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
