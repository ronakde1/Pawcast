import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
  screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="(tabs)" 
    options = {{headerTitle: "Pawcast"}}
    />
    <Stack.Screen name="about" 
    options = {{headerTitle: "About"}}
    />
</Stack>;
}
