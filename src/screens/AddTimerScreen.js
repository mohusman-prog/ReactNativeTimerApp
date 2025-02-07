import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useTimer } from '../context/TimerContext';

const AddTimerScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const { dispatch } = useTimer();

  const handleAddTimer = () => {
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      category,
      remainingTime: parseInt(duration),
      status: 'stopped',
      halfwayAlert: false,
    };

    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <Button title="Add Timer" onPress={handleAddTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddTimerScreen;