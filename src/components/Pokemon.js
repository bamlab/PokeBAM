'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroNode,
  ViroQuad,
  ViroParticleEmitter
} from 'react-viro';

import WeaponEnabledContext from 'PokeBAM/src/WeaponEnabledContext';

export default class Pokemon extends Component {
  constructor() {
    super();
    this.state = {
      position: [0, 0, 0],
      visible: true
    };
  }
  render() {
    return (
      <ViroNode>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroParticleEmitter
          position={[0, 0, -3]}
          duration={1200}
          visible={true}
          run={true}
          loop={true}
          fixedToEmitter={true}
          image={{
            source: require('PokeBAM/src/assets/blood.png'),
            height: 0.3,
            width: 0.3,
            bloomThreshold: 0.0
          }}
          spawnBehavior={{
            particleLifetime: [500, 500],
            emissionRatePerSecond: [30, 40],
            maxParticles: 800
          }}
          particleAppearance={{
            opacity: {
              initialRange: [0.2, 0.2],
              factor: 'Time',
              interpolation: [
                { endValue: 0.2, interval: [0, 200] },
                { endValue: 0.0, interval: [200, 500] }
              ]
            },
            scale: {
              initialRange: [[1, 1, 1], [1, 1, 1]],
              factor: 'Time',
              interpolation: [{ endValue: [0, 0, 0], interval: [150, 500] }]
            }
          }}
          particlePhysics={{
            velocity: { initialRange: [[0, 0.3, 0], [0, 0.5, 0]] }
          }}
        />
        <WeaponEnabledContext.Consumer>
          {({ weaponEnabled }) => {
            return (
              <Viro3DObject
                source={require('PokeBAM/src/assets/3D/Pokemons/Pidgey/Pidgey.vrx')}
                resources={[
                  require('PokeBAM/src/assets/3D/Pokemons/Pidgey/pm0016_00_Body1.png'),
                  require('PokeBAM/src/assets/3D/Pokemons/Pidgey/pm0016_00_Body2.png'),
                  require('PokeBAM/src/assets/3D/Pokemons/Pidgey/pm0016_00_BodyNor.png'),
                  require('PokeBAM/src/assets/3D/Pokemons/Pidgey/pm0016_00_Eye1.png'),
                  require('PokeBAM/src/assets/3D/Pokemons/Pidgey/pm0016_00_Eye2.png'),
                  require('PokeBAM/src/assets/3D/Pokemons/Pidgey/pm0016_00_EyeNor.png')
                ]}
                physicsBody={{
                  type: 'Static'
                }}
                onCollision={() => {
                  this.setState({ visible: false }, () => {
                    setTimeout(() => {
                      this.setState({ visible: true });
                    }, 5000);
                  });
                }}
                position={[0, 0, -3]}
                rotation={[-90, 0, 0]}
                dragType="FixedToWorld"
                scale={[0.02, 0.02, 0.02]}
                type="VRX"
                visible={this.state.visible}
              />
            );
          }}
        </WeaponEnabledContext.Consumer>
      </ViroNode>
    );
  }
}

ViroMaterials.createMaterials({
  ground: {
    diffuseColor: 'transparent'
  }
});

module.exports = Pokemon;
