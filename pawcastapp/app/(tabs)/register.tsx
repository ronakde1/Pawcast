import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

export default function Register() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    console.log('Name:', name);
    console.log('Location:', location);
    // You can add navigation or form submission here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>WELCOME</Text>
      <Text style={styles.subheader}>Tell us something about you:</Text>

      <View style={styles.inputContainer}>
        <Text>Name</Text>
        <TextInput
          style={styles.boxstyle}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />
        {name !== '' && (
          <Text>Your name is {name}.</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text>Location</Text>
        <TextInput
          style={styles.boxstyle}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
        />
        {location !== '' && (
          <Text>Your location is {location}.</Text>
        )}
      </View>

      <Button onPress={handleNext} title="Next" color="#841584" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  boxstyle: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
});


{/*  return (
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
} */}