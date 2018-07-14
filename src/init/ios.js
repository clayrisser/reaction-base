import React from 'react';
import ignoreWarnings from 'react-native-ignore-warnings';
import { AppRegistry } from 'react-native';
import { persistStore } from 'redux-persist';
import IosApp from '../../../ios/IosApp';
import createStore from '../createStore';
import { registerConfig } from '../config';
import { setLevel } from '../log';

export default function ios(initialProps = {}, config = {}) {
  ignoreWarnings(config.ignore.warnings || []);
  ignoreWarnings('error', config.ignore.errors || []);
  if (config.options.verbose) {
    setLevel('verbose');
  } else if (config.options.debug || config.env === 'development') {
    setLevel('debug');
  }
  registerConfig(config);
  const context = {};
  context.store = createStore(context);
  context.persistor = persistStore(context.store);
  initialProps.context = context;
  AppRegistry.registerComponent(config.key, () => {
    return () => <IosApp {...initialProps} />;
  });
  return { config, initialProps };
}