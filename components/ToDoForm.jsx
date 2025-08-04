import { StyleSheet, View, TextInput, Button } from "react-native";
import { useState } from "react";
import firebase from "./firebaseConfig";

function ToDoForm({ addTask }) {
  const [task, setTask] = useState("");

  const handleAddTask = async () => {
    addTask(task);
    setTask("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add" onPress={handleAddTask} />
    </View>
  );
}

export default ToDoForm;

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
});
