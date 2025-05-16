import React from 'react';
import { Text, View, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons

export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}
      >
        Details Screen
      </Text>

      {/* Touchable icon */}
      <TouchableOpacity onPress={() => Alert.alert('Hi!')}>
        <Icon name="logo-nodejs" size={100} color="#68A063" />
      </TouchableOpacity>
    </View>
  );
}
