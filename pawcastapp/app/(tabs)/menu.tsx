import { useState } from "react";
import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export default function Menu({ title }: { title: string }) {
  const [modalVisible, setModalVisible] = useState(false); // Added state for modal visibility
  
  return (
    <View style={styles.menuRow}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <MaterialCommunityIcons name="menu" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                router.push('/');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Dog Walking Time</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => {
                router.push('/information');
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalText}>Dog Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalItem}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFE600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 60, // Position dropdown below header
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 200,
    marginLeft: 20,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalText: {
    fontSize: 18,
    color: "#000",
  },
  menuRow: {
    marginBottom: 20
  }
})