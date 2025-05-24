import { Stack } from 'expo-router';
import { RegistrationProvider } from './register/registrationContext';

export default function RootLayout() {
  return <RegistrationProvider>
    <Stack screenOptions={{ headerShown: false }} />;
  </RegistrationProvider>
}