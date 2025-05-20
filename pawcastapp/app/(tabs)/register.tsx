import { Text, View, Image, StyleSheet, TextInput, Button } from "react-native";
import {Link} from "expo-router"
import {styles} from "./index"
import { Colors } from "react-native/Libraries/NewAppScreen";

type FieldProps = {
  header: string;
};

const Field = ({ header }: FieldProps) => {
  return (
    <View>
      <Text>{header}</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          borderRadius: 5,
          height: 40,
          width: 250,
        }}
      />
    </View>
  );
}

export default function register() {
  return (
    <View style={styles.container}>
      <Text>WELCOME</Text>
      <Text>Tell us something about you:</Text>
      <View>
        <Field header="Name"/>
        <Field header="Location"/>
        <Button
          // onPress={}
          title="Next"
          color="#841584"
        />
      </View>
  </View>

  );
}