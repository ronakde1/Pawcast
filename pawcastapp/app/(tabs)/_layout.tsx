import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs
  screenOptions={{
    tabBarActiveTintColor: "#ffd33d"
  }}>
    <Tabs.Screen name="index" 
    options = {{headerTitle: "Pawcast"}}
    />
    <Tabs.Screen name="about" 
    options = {{headerTitle: "About"}}
    />
</Tabs>;
}
