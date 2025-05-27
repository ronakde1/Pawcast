import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingCheck() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const onboarded = await AsyncStorage.getItem('hasOnBoarded');
      if (onboarded === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/(register)/user');
      }
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
