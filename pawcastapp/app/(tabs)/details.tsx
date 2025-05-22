import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function WeatherPage() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Husky.png')} // Update to your image path
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Text style={styles.time}>10 : 00</Text>

          <View style={styles.box}><Text style={styles.value}>11{'\n'}<Text style={styles.label}>UV Radiation</Text></Text></View>
          <View style={styles.box}><Text style={styles.value}>27{'\n'}<Text style={styles.label}>Temperature(°C)</Text></Text></View>
          <View style={styles.box}><Text style={styles.value}>29{'\n'}<Text style={styles.label}>AQI</Text></Text></View>
          <View style={styles.box}><Text style={styles.value}>79{'\n'}<Text style={styles.label}>Humidity(%)</Text></Text></View>
          <View style={styles.box}><Text style={styles.value}>54{'\n'}<Text style={styles.label}>Pollen(PPM)</Text></Text></View>

          <View style={styles.rating}>
            <Text style={styles.ratingText}>8</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  box: {
    width: 250,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    paddingVertical: 12,
    marginVertical: 6,
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  rating: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginTop: 20,
  },
  ratingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
