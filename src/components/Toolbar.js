'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const pokeballImage = require('PokeBAM/src/assets/pokeball_button.png');
const weaponImage = require('PokeBAM/src/assets/weapon_button.png');

import WeaponEnabledContext from 'PokeBAM/src/WeaponEnabledContext';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <WeaponEnabledContext.Consumer>
        {({ toggleWeaponEnabled, weaponEnabled, onWeaponLoaded }) => {
          const image = weaponEnabled ? pokeballImage : weaponImage;
          return (
            <View>
              {weaponEnabled ? (
                <Image
                  style={styles.gun}
                  source={require('PokeBAM/src/assets/weapon.png')}
                  onLoadEnd={onWeaponLoaded}
                />
              ) : null}
              <TouchableOpacity
                style={styles.container}
                onPress={toggleWeaponEnabled}
              >
                <Image style={styles.image} source={image} />
              </TouchableOpacity>
            </View>
          );
        }}
      </WeaponEnabledContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 100,
    height: 100,
  },
  gun: {
    position: 'absolute',
    right: 110,
    bottom: 0,
    width: 200,
    height: 150,
  },
  image: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
  },
});

module.exports = Toolbar;
