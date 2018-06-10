"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import {
  Viro3DObject,
  ViroAmbientLight,
  ViroARPlane,
  ViroMaterials,
  ViroQuad
} from "react-viro";

import WeaponEnabledContext from "PokeBAM/src/WeaponEnabledContext";

export default class Pokemon extends Component {
  constructor() {
    super();
    this.state = {
      planeCoords: {
        x: 0,
        y: 0,
        z: 0
      },
      visible: true
    };
  }
  render() {
    return (
      <ViroARPlane
        minHeight={0.05}
        minWidth={0.05}
        alignment={"Horizontal"}
        onAnchorFound={e => {
          this.setState({
            planeCoords: {
              x: e.position[0],
              y: e.position[1],
              z: e.position[2] - 1
            }
          });
        }}
      >
        <ViroAmbientLight color="#FFFFFF" />
        <ViroQuad
          position={[
            this.state.planeCoords.x,
            this.state.planeCoords.y,
            this.state.planeCoords.z
          ]}
          height={20}
          width={10}
          rotation={[-90, 0, 0]}
          physicsBody={{
            type: "Static"
          }}
          materials={["ground"]}
        />
        <WeaponEnabledContext.Consumer>
          {({ weaponEnabled }) => {
            return (
              <Viro3DObject
                source={require("PokeBAM/src/assets/3D/Pokemons/Squirtle/Squirtle.vrx")}
                resources={[
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_Body1.png"),
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_Body1Id.png"),
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_BodyNor.png"),
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_Eye1.png"),
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_Eye1Id.png"),
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_Eye2.png"),
                  require("PokeBAM/src/assets/3D/Pokemons/Squirtle/pm0007_00_EyeNor.png")
                ]}
                position={[
                  this.state.planeCoords.x,
                  this.state.planeCoords.y,
                  this.state.planeCoords.z
                ]}
                rotation={[-90, 0, 0]}
                dragType="FixedToWorld"
                scale={[0.015, 0.015, 0.015]}
                type="VRX"
                visible={this.state.visible}
                onClick={() =>
                  weaponEnabled ? this.setState({ visible: false }) : null
                }
              />
            );
          }}
        </WeaponEnabledContext.Consumer>
      </ViroARPlane>
    );
  }
}

ViroMaterials.createMaterials({
  ground: {
    diffuseColor: "transparent"
  }
});

module.exports = Pokemon;
