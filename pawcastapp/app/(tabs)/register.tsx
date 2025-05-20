import { Text, View, Image, StyleSheet, TextInput, Button } from "react-native";
import {Link} from "expo-router"
import {styles} from "./index"
import { Colors } from "react-native/Libraries/NewAppScreen";
import React, { useState } from 'react';



export default function register() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');


  const handleNext = () => {
    console.log('Name:', name);
    console.log('Location:', location);
    // use these variables however you need
  };

  return (
  <View style={styles.container}>
    <Text>WELCOME</Text>
    <Text>Tell us something about you:</Text>
    <View>
    <Text>Name</Text>
    <label>
      <input
        style={styles.boxstyle}
        value={name}
        onChange={e => setName(e.target.value)}
      />
    </label>
    {name !== '' &&
      <p>Your name is {name}.</p>
    }
    </View>
    <View>
    <Text>Location</Text>
    <label>
      <input
        style={styles.boxstyle}
        value={location}
        onChange={e => setLocation(e.target.value)}
      />
    </label>
    {location !== '' &&
      <p>Your location is {location}.</p>
    }
    <Button onPress={handleNext} title="Next" color="#841584" />
    </View>
  </View>
  );
}