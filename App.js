/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';

import { ViroARSceneNavigator } from 'react-viro';

import { StyleSheet, View } from 'react-native';

import WeaponEnabledContext from './src/WeaponEnabledContext';

import { VIRO_API_KEY } from './environment.secret';

import Toolbar from './src/components/Toolbar';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: VIRO_API_KEY,
};

// Sets the default scene you want for AR
var InitialARScene = require('./src/Home');

export default class ViroSample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sharedProps: sharedProps,
      weaponEnabled: false,
      weaponLoaded: false,
    };
    this._getARNavigator = this._getARNavigator.bind(this);
    this._toggleWeaponEnabled = this._toggleWeaponEnabled.bind(this);
    this._onWeaponLoaded = this._onWeaponLoaded.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    return this._getARNavigator();
  }

  _toggleWeaponEnabled() {
    this.setState({
      weaponEnabled: !this.state.weaponEnabled,
      weaponLoaded: false,
    });
  }

  _onWeaponLoaded() {
    this.setState({ weaponLoaded: true });
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <View style={styles.container}>
        <WeaponEnabledContext.Provider
          value={{
            toggleWeaponEnabled: this._toggleWeaponEnabled,
            onWeaponLoaded: this._onWeaponLoaded,
            weaponEnabled: this.state.weaponEnabled,
            weaponLoaded: this.state.weaponLoaded,
          }}
        >
          <ViroARSceneNavigator
            {...this.state.sharedProps}
            initialScene={{ scene: InitialARScene }}
          />
          <Toolbar />
        </WeaponEnabledContext.Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = ViroSample;
