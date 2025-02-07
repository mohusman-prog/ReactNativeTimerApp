import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTimer } from '../context/TimerContext';

const HistoryScreen = () => {
  const { state } = useTimer();

  console.log('History:', state.history); 

  return (
    <ScrollView style={styles.container}>
      {state.history.length === 0 ? (
        <Text style={styles.emptyMessage}>No history available.</Text>
      ) : (
        state.history.map((item, index) => (
          <View key={index} style={styles.historyItem}>
            <Text style={styles.timerName}>{item.timerName}</Text>
            <Text>Completed: {new Date(item.completedAt).toLocaleString()}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  historyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  timerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HistoryScreen;