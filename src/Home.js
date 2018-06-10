'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';

import Pokemon from './components/Pokemon';
import Pokeball from './components/Pokeball';

export default class Home extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Starting PokeBAM...',
      orientation: {
        position: [0, 0, 0],
        orientation: [0, 0, 0],
        forward: [0, 0, 0],
        rotation: [0, 0, 0],
        up: [0, 0, 0]
      }
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this.scene = null;
  }

  componentDidMount() {
    setInterval(() => {
      if (this.scene) {
        this.scene.getCameraOrientationAsync().then(orientation => {
          this.setState({
            orientation
          });
        });
      }
    }, 10);
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        ref={ref => {
          this.scene = ref;
        }}
      >
        {this.state.text && (
          <ViroText
            text={this.state.text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
            style={styles.textStyle}
          />
        )}
        <Pokemon />
        <Pokeball orientation={this.state.orientation} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: null
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = Home;
