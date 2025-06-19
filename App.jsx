import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState(["Do laundry", "Go to gym", "Walk dog"]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => {
      const taskExists = prevTasks.includes(newTask);
      if (taskExists) {
        return prevTasks;
      }

      return [...prevTasks, newTask];
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ToDoList tasks={tasks} />
      </ScrollView>
      <ToDoForm addTask={addTask} />
    </SafeAreaView>
  );
}
