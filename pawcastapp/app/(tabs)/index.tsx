import { Text, View, Image, StyleSheet } from "react-native";
import {Link} from "expo-router"

export default function Home() {
  return (
    <View style={styles.container}>
      {/*<Image style={styles.image} source = {require("../assets/images/Husky.png")} />*/}
      <Text>Home screen</Text>
      <Link href={"/details"}>Go to details screen</Link>
  </View>

  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "100%",
    width: "100%"
  },
})
