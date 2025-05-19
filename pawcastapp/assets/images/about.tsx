import { Text, View, Image, StyleSheet } from "react-native";
import {Link} from "expo-router"

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>Hello</Text>
      <Link href={"./about"}>Go to about screen</Link>
  </View>

  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'yellow',
      fontSize: 50
    }
  })