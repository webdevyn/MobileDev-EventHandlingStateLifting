# Event Handling & State Lifting

A React Native mobile application exploring core React patterns for managing state and user interactions. This project demonstrates best practices for handling events and lifting state across component hierarchies—essential patterns for building scalable mobile applications.

## 🎯 Overview

Building complex mobile applications requires mastering how components communicate and share state. This project is a deep dive into two fundamental React concepts that form the foundation of maintainable, scalable apps:

- **Event Handling** - Capturing and responding to user interactions effectively
- **State Lifting** - Managing shared state at the appropriate component level to enable component communication

Whether you're building a simple counter or a complex form with multiple interdependent fields, these patterns are critical to writing clean, maintainable code.

## ✨ Features

- **Comprehensive Event Handling** - Button clicks, text input, gestures, and touch events
- **State Lifting Patterns** - Shared state management across parent and child components
- **Component Communication** - Callback functions and parent-child data flow
- **Interactive Examples** - Multiple real-world component patterns
- **Form Management** - Text fields, buttons, and complex form handling
- **Real-Time Updates** - Responsive UI that reacts instantly to user input
- **Multiple Examples** - Different approaches to solving state management challenges
- **Best Practices** - Production-ready patterns and architectural decisions
- **Cross-Platform** - Works seamlessly on iOS, Android, and Web via Expo

## 🛠 Tech Stack

### Frontend Framework
- **React Native 0.79** - Cross-platform mobile framework
- **React 19.0** - Modern React with hooks for state management
- **Expo 53.0** - Managed React Native development platform
- **JavaScript (ES6+)** - Modern JavaScript features

### Development Tools
- **Babel 7.20** - JavaScript transpiler
- **Expo CLI** - Development server and testing
- **React DevTools** - Component debugging and inspection

## 📁 Project Structure

```
MobileDev-EventHandlingStateLifting/
├── src/                              # Source code
│   ├── components/
│   │   ├── Counter.js               # State management example
│   │   ├── TextInput.js             # Controlled input pattern
│   │   ├── ToggleButton.js          # Boolean state example
│   │   ├── FormComponent.js         # Multi-field form handling
│   │   ├── ChildComponent.js        # Child receiving lifted state
│   │   └── ParentComponent.js       # Parent managing shared state
│   ├── screens/
│   │   ├── CounterScreen.js         # Counter demo
│   │   ├── FormScreen.js            # Form pattern showcase
│   │   ├── ListScreen.js            # List item interactions
│   │   ├── InteractionScreen.js     # Multi-component interactions
│   │   └── AdvancedScreen.js        # Complex state scenarios
│   ├── hooks/
│   │   └── useStateExamples.js      # Custom hook patterns
│   ├── navigation/
│   │   └── Navigation.js            # Screen navigation
│   ├── App.js                       # Root component
│   └── styles/
│       └── globalStyles.js          # Shared styling
├── app.json                         # Expo configuration
├── package.json                     # Dependencies
├── README.md                        # This file
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Studio Emulator
- Expo Go app (for physical device testing)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/webdevyn/MobileDev-EventHandlingStateLifting.git
cd MobileDev-EventHandlingStateLifting
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm start
# or
npx expo start
```

### Running on Different Platforms

#### iOS Simulator (macOS)

```bash
npm run ios
# or press 'i' in the Expo CLI
```

#### Android Emulator

```bash
npm run android
# or press 'a' in the Expo CLI
```

Ensure Android Studio is installed with an emulator running.

#### Web Browser

```bash
npm run web
# or press 'w' in the Expo CLI
```

Opens at `http://localhost:19000`

#### Physical Device

1. Install Expo Go from App Store (iOS) or Play Store (Android)
2. Scan the QR code displayed in the terminal
3. App launches in Expo Go

## 📚 Core Concepts

### Event Handling

Event handling is how React captures and responds to user interactions. Understanding how to properly handle events is crucial for building responsive user interfaces.

#### Button Press Events

```javascript
import { Button, View } from 'react-native';

const handleButtonPress = () => {
  console.log('Button pressed!');
  // Update state or trigger side effects
};

export const MyButton = () => (
  <View>
    <Button
      title="Press Me"
      onPress={handleButtonPress}
    />
  </View>
);
```

**Why this matters:** Buttons are the primary way users trigger actions. Handling these events correctly ensures your app responds to user intent.

#### Text Input Events

```javascript
import { TextInput, View, Text } from 'react-native';
import { useState } from 'react';

export const MyTextInput = () => {
  const [text, setText] = useState('');

  const handleTextChange = (input) => {
    setText(input);
    // Could validate, filter, or trigger side effects
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={handleTextChange}
        placeholder="Enter text"
      />
      <Text>You typed: {text}</Text>
    </View>
  );
};
```

**Why this matters:** Text inputs require controlled components—React must manage their state to provide real-time feedback and validation.

#### Touch Events

```javascript
import { View, Text } from 'react-native';

export const TouchableView = () => {
  const handlePressIn = () => console.log('Press started');
  const handlePressOut = () => console.log('Press ended');

  return (
    <View 
      onTouchStart={handlePressIn} 
      onTouchEnd={handlePressOut}
      style={{ padding: 20, backgroundColor: '#ddd' }}
    >
      <Text>Touch me!</Text>
    </View>
  );
};
```

**Why this matters:** Touch events give you control over the entire gesture lifecycle, enabling complex interactions like swipes, long presses, and multi-touch gestures.

### State Lifting

State lifting is one of the most important patterns in React. It solves a critical problem: when multiple components need to share state, where should that state live?

The answer: **it should live in the closest common ancestor** of all components that need it.

#### The Problem: Isolated State

```javascript
// ❌ This won't work for sharing state
const Counter1 = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Counter 1: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

const Counter2 = () => {
  const [count, setCount] = useState(0);
  return (
    <View>
      <Text>Counter 2: {count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

// Problem: Each counter has its own independent state
// They can't communicate or share values
```

#### The Solution: Lifted State

```javascript
// ✅ State lives in the parent where it's shared
const CounterApp = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => setCount(count - 1);
  const handleReset = () => setCount(0);

  return (
    <View>
      <DisplayCount count={count} />
      <Controls 
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={handleReset}
      />
    </View>
  );
};

const DisplayCount = ({ count }) => (
  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
    Count: {count}
  </Text>
);

const Controls = ({ onIncrement, onDecrement, onReset }) => (
  <View>
    <Button title="+" onPress={onIncrement} />
    <Button title="-" onPress={onDecrement} />
    <Button title="Reset" onPress={onReset} />
  </View>
);
```

**Why this matters:** By lifting state, both `DisplayCount` and `Controls` now share the same count value. Changes in one child are reflected in all siblings instantly.

## 🎨 Real-World Component Examples

### Counter Component

A practical example of state management and event handling working together.

```javascript
import { View, Button, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleDecrement = () => {
    const newCount = Math.max(0, count - 1);
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttons}>
        <Button title="Increment" onPress={handleIncrement} />
        <Button title="Decrement" onPress={handleDecrement} />
      </View>
      <Text style={styles.history}>
        History: {history.join(' → ')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  count: { fontSize: 48, fontWeight: 'bold', marginVertical: 20 },
  buttons: { flexDirection: 'row', gap: 10 },
  history: { marginTop: 20, fontSize: 12, color: '#666' }
});
```

**Learning points:** This demonstrates state updates, callback functions, and managing multiple pieces of state together.

### Form Component with State Lifting

A more complex example showing how state lifting enables component communication.

```javascript
import { View, TextInput, Button, Text, ScrollView } from 'react-native';
import { useState } from 'react';

export const FormExample = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const handleSubmit = () => {
    if (name.trim() && email.trim()) {
      setSubmissions([...submissions, { name, email, id: Date.now() }]);
      setName('');
      setEmail('');
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <FormInput
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <FormInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
      
      <SubmissionsList submissions={submissions} />
    </ScrollView>
  );
};

const FormInput = ({ label, value, onChangeText, keyboardType = 'default' }) => (
  <View style={{ marginBottom: 15 }}>
    <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={{ 
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 10,
        borderRadius: 4
      }}
    />
  </View>
);

const SubmissionsList = ({ submissions }) => (
  <View style={{ marginTop: 20 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
      Submissions ({submissions.length})
    </Text>
    {submissions.map(sub => (
      <View key={sub.id} style={{ 
        padding: 10, 
        backgroundColor: '#f5f5f5', 
        marginBottom: 8,
        borderRadius: 4
      }}>
        <Text>{sub.name}</Text>
        <Text style={{ color: '#666' }}>{sub.email}</Text>
      </View>
    ))}
  </View>
);
```

**Learning points:** State lifting, multiple input fields, form submission, list rendering, and component composition.

### Toggle Component

A simple but elegant example of boolean state and event handling.

```javascript
import { View, Button, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export const Toggle = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        Status: {isOn ? '🟢 ON' : '🔴 OFF'}
      </Text>
      <Button
        title={isOn ? 'Turn Off' : 'Turn On'}
        onPress={() => setIsOn(!isOn)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  status: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' }
});
```

## 🔄 Data Flow Pattern

Understanding this flow is key to mastering React:

```
User Interaction (tap, type, etc)
           ↓
Event Handler Triggered
           ↓
State Updated (setState called)
           ↓
Component Re-renders
           ↓
New Props Passed to Children
           ↓
Child Components Re-render
           ↓
UI Reflects New State
```

This unidirectional data flow makes React applications predictable and easier to debug.

## 💡 Key Insights

### When to Lift State

Ask yourself these questions:

1. **Do multiple components need this state?** → Lift it
2. **Does a child need to communicate with a sibling?** → Lift state to parent
3. **Do you need to track multiple related values?** → Consider lifting them together
4. **Is state only used in one component?** → Keep it local

### Avoiding Common Mistakes

```javascript
// ❌ DON'T mutate state directly
state.count = state.count + 1;

// ✅ DO create new state
setState(prevState => ({ ...prevState, count: prevState.count + 1 }));
setState(count + 1); // Simpler for primitives

// ❌ DON'T call event handlers immediately
<Button onPress={handlePress()} />

// ✅ DO pass function references
<Button onPress={handlePress} />
<Button onPress={() => handlePress(param)} />

// ❌ DON'T forget to pass callbacks to children
<Child value={state} />

// ✅ DO pass both state and callbacks
<Child value={state} onChange={(val) => setState(val)} />
```

## 🧪 Testing Your Understanding

Here are some patterns to test yourself with:

- ✅ Build a component with multiple buttons that update shared state
- ✅ Create a form where field validation depends on state
- ✅ Implement a list where adding/removing items updates a counter
- ✅ Build nested components that communicate through lifted state
- ✅ Handle complex user interactions (multi-step flows, conditional rendering)

## 📱 Project Examples

The project includes multiple screens demonstrating these concepts:

- **Counter Screen** - Basic state management and increment/decrement
- **Form Screen** - Multiple inputs, validation, and submission
- **List Screen** - Adding/removing items with event handlers
- **Interaction Screen** - Multiple components with lifted state
- **Advanced Screen** - Complex scenarios and nested state lifting

Each screen is designed to be a learning tool and reference implementation.

## 🚀 Deployment

### Build for Production

```bash
eas build --platform ios
eas build --platform android
eas build --platform web
```

For detailed deployment instructions, see [Expo Deployment Documentation](https://docs.expo.dev/deploy/build-project/).

## 🐛 Debugging

### React DevTools

```javascript
// With Expo, React DevTools is built-in
npm start
// Press 'd' to open Shift+M for menu
```

### Common Patterns to Debug

- State not updating? Check if you're mutating directly
- Component not re-rendering? Verify state is actually changing
- Children not receiving updates? Confirm state is lifted to the right parent

## 📚 Resources

- [React Hooks Documentation](https://react.dev/reference/react/useState) - Official useState guide
- [Responding to Events](https://react.dev/learn#responding-to-events) - Event handling fundamentals
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components) - State lifting deep dive
- [React Native Touch Events](https://reactnative.dev/docs/handling-touches) - Advanced touch handling
- [Expo Documentation](https://docs.expo.dev/) - Development and deployment

## 🤝 Contributing

Improvements and additions welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-example`)
3. Add new component examples or improve existing ones
4. Commit changes (`git commit -m 'Add new pattern example'`)
5. Push to branch (`git push origin feature/new-example`)
6. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Devyn Weir**
- GitHub: [@webdevyn](https://github.com/webdevyn)
- Portfolio: [webdevyn.github.io](https://webdevyn.github.io)

## 📞 Questions?

Have questions about event handling, state lifting, or React patterns? Open a GitHub Issue and let's discuss!

---

**Last Updated**: July 16, 2026  
**Version**: 1.0.0  
**Status**: Actively Maintained  
**Core Topics**: Event Handling • State Management • State Lifting • React Patterns
