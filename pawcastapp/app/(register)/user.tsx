import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useRegistration } from './registrationContext';

export default function UserDetails() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const { setData } = useRegistration();
  const router = useRouter();

  const handleNext = () => {
    console.log('Name:', name);
    console.log('Location:', location);
    setData(prev => ({
      ...prev,
      username: name,
      location: location,
    }));
    router.push({
      pathname: "./dog",
    });
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
      </View>

      <View style={styles.inputContainer}>
        <Text>Location</Text>
        <TextInput
          style={styles.boxstyle}
          value={location}
          onChangeText={setLocation}
          placeholder="Enter your location"
        />
      </View>

      <Button onPress={handleNext} title="Next" color="#2C2C2C" />
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
