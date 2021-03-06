'use strict';

import React, { Component } from 'react';

import {
  ViroNode,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight
} from 'react-viro';

const PokeBallForwardFactor = 0.1;
const PokeBallUpFactor = 0.03;
const ForceForwardFactor = 5;

export default class Pokeball extends Component {
  constructor() {
    super();
    this.state = {
      shouldHoldPokeball: true
    };
    this.pokeball = null;
  }

  shouldComponentUpdate(nextProps) {
    return this.state.shouldHoldPokeball;
  }

  render() {
    const { orientation } = this.props;
    return (
      <ViroNode>
        <ViroAmbientLight color="#FFFFFF" />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={orientation.forward}
          position={[
            orientation.position[0],
            orientation.position[1],
            orientation.position[2]
          ]}
          color="#ffffff"
          castsShadow={true}
        />
        <Viro3DObject
          source={require('PokeBAM/src/assets/3D/Pokeballs/Regular/pokeball.obj')}
          position={[
            orientation.position[0] +
              orientation.forward[0] * PokeBallForwardFactor -
              orientation.up[0] * PokeBallUpFactor,
            orientation.position[1] +
              orientation.forward[1] * PokeBallForwardFactor -
              orientation.up[1] * PokeBallUpFactor,
            orientation.position[2] +
              orientation.forward[2] * PokeBallForwardFactor -
              orientation.up[2] * PokeBallUpFactor
          ]}
          rotation={[
            orientation.rotation[0],
            orientation.rotation[1] - 90,
            orientation.rotation[2]
          ]}
          ref={pokeball => (this.pokeball = pokeball)}
          scale={[0.0001, 0.0001, 0.0001]}
          type="OBJ"
          dragType="FixedDistance"
          physicsBody={{
            type: 'Dynamic',
            mass: 1,
            useGravity: !this.state.shouldHoldPokeball,
            restitution: 0.5
          }}
          onDrag={() => {}}
          onClick={() => {
            this.pokeball.applyImpulse(
              orientation.forward.map(n => n * ForceForwardFactor)
            );
            this.setState({ shouldHoldPokeball: false });
          }}
        />
      </ViroNode>
    );
  }
}

module.exports = Pokeball;
