const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// By default Metro skips transforming node_modules.
// @expo/vector-icons vendor files use class fields (static defaultProps = ...)
// which Hermes cannot run untransformed. Force Babel to transform them.
const defaultExcludes = [
  'react-native',
  '@react-native',
  '@react-navigation',
  'expo',
  '@expo',
  '@unimodules',
  'unimodules',
  'native-base',
  'react-native-svg',
  '@sentry',
];

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

// Allow all @expo/* and react-native/* packages to be Babel-transformed
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
