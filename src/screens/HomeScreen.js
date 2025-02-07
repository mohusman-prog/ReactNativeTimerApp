import React from 'react';
import { Text,View, Button, ScrollView, StyleSheet } from 'react-native';
import { useTimer } from '../context/TimerContext';
import TimerItem from '../components/TimerItem';

const HomeScreen = ({ navigation }) => {
  const { state } = useTimer();

  const groupedTimers = state.timers.reduce((groups, timer) => {
    if (!groups[timer.category]) {
      groups[timer.category] = [];
    }
    groups[timer.category].push(timer);
    return groups;
  }, {});

  return (
    <View style={styles.container}>
      <Button
        title="Add Timer"
        onPress={() => navigation.navigate('AddTimer')}
      />
      <Button
        title="View History"
        onPress={() => navigation.navigate('History')}
      />
      <ScrollView>
        {Object.entries(groupedTimers).map(([category, timers]) => (
          <View key={category} style={styles.category}>
            <Text style={styles.categoryTitle}>{category}</Text>
            {timers.map(timer => (
              <TimerItem key={timer.id} timer={timer} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  category: {
    marginTop: 20,
    padding: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;