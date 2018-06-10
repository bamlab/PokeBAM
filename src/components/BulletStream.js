"use strict";

import React, { Component } from "react";

import { StyleSheet } from "react-native";

import { ViroSphere, ViroMaterials } from "react-viro";

const BULLET_POSITION_FACTOR = 0.3;

export default class BulletStream extends Component {
  constructor() {
    super();
    this.state = {
      position: [0, 0, -1],
      alive: true
    };
  }
  static getDerivedStateFromProps(props) {
    return {
      position: [
        props.position[0] - props.up[0] * BULLET_POSITION_FACTOR,
        props.position[1] - props.up[1] * BULLET_POSITION_FACTOR,
        props.position[2] - props.up[2] * BULLET_POSITION_FACTOR
      ]
    };
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        ...BulletStream.getDerivedStateFromProps(this.props),
        alive: !this.state.alive
      });
    }, 300);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    if (!this.state.alive) return null;
    return (
      <ViroSphere
        heightSegmentCount={20}
        widthSegmentCount={20}
        radius={2}
        position={this.state.position}
        scale={[0.006, 0.006, 0.006]}
        physicsBody={{
          type: "Dynamic",
          mass: 1,
          useGravity: false,
          force: {
            value: this.props.force
          }
        }}
        materials={["spherematerial"]}
      />
    );
  }
}

ViroMaterials.createMaterials({
  spherematerial: {
    diffuseColor: "#6B6B6B"
  }
});

module.exports = BulletStream;
