import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import AddTimerScreen from './src/screens/AddTimerScreen';
import { TimerProvider } from './src/context/TimerContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="AddTimer" component={AddTimerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
};

export default App;


// import React from 'react';
// import { SafeAreaView, Text, StyleSheet } from 'react-native';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.text}>Hello, Wd!</Text>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default App;
