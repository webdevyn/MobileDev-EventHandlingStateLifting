import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import { View, StyleSheet } from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./components/firebaseConfig";

export default function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "todos"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasks);
    });
    return () => unsubscribe();
  });

  const addTask = async (taskText) => {
    //check if task is empty
    if (taskText.trim() === "") return;
    try {
      await addDoc(collection(db, "todos"), {
        task: taskText,
        createdAt: new Date(),
      });
    } catch (error) {
      alert("Error Adding Task: ", error);
    }
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
