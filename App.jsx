import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ToDoList />
      </ScrollView>
      <ToDoForm />
    </SafeAreaView>
  );
}
