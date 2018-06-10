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
  ViroParticleEmitter,
  ViroAnimations
} from 'react-viro';

import WeaponEnabledContext from 'PokeBAM/src/WeaponEnabledContext';

export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      life: 5,
      showBlood: false
    };
  }
  render() {
    return (
      <ViroNode>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroParticleEmitter
          position={[0, 0, -2]}
          duration={1200}
          visible={true}
          run={this.state.showBlood}
          fixedToEmitter={true}
          image={{
            source: require('PokeBAM/src/assets/blood.png'),
            height: 0.1,
            width: 0.1,
            bloomThreshold: 0.0
          }}
          spawnBehavior={{
            particleLifetime: [1200, 1200],
            emissionRatePerSecond: [0, 0],
            emissionBurst: [{ time: 0, min: 300, max: 350, cycles: 1 }],
            spawnVolume: {
              shape: 'sphere',
              params: [0.15],
              spawnOnSurface: true
            },
            maxParticles: 1000
          }}
          particleAppearance={{
            opacity: {
              initialRange: [1.0, 1.0],
              factor: 'Time',
              interpolation: [{ endValue: 0.0, interval: [800, 1200] }]
            },

            color: {
              initialRange: ['red', 'red'],
              factor: 'Time',
              interpolation: [{ endValue: 'red', interval: [300, 1200] }]
            }
          }}
          particlePhysics={{
            explosiveImpulse: {
              impulse: 0.12 * 6.0,
              position: [0, 0, 0],
              decelerationPeriod: 1.0
            }
          }}
        />
        <WeaponEnabledContext.Consumer>
          {({ weaponEnabled }) => {
            return (
              <Viro3DObject
                animation={{ name: 'animatePokemon', run: true, loop: true }}
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
                  if (this.state.life === 1 || !weaponEnabled) {
                    this.setState({ visible: false, life: 5 }, () => {
                      setTimeout(() => {
                        this.setState({ visible: true });
                      }, 5000);
                    });
                  } else {
                    this.setState(
                      { life: this.state.life - 1, showBlood: true },
                      () => {
                        setTimeout(() => {
                          this.setState({ showBlood: false });
                        }, 20);
                      }
                    );
                  }
                }}
                position={[0, 0, -2]}
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

ViroAnimations.registerAnimations({
  moveRight: {
    properties: { positionX: '+=1' },
    duration: 500
  },
  moveLeft: {
    properties: { positionX: '-=1' },
    duration: 500
  },
  moveUp: {
    properties: { positionY: '+=0.3' },
    duration: 500
  },
  moveDown: {
    properties: { positionY: '-=0.3' },
    duration: 500
  },
  animatePokemon: [['moveRight', 'moveUp', 'moveLeft', 'moveDown']]
});

module.exports = Pokemon;
