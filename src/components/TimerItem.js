import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useTimer } from '../context/TimerContext';

const TimerItem = ({ timer, onUpdateTimer }) => {
  const [localTimer, setLocalTimer] = useState({
    ...timer,
    status: timer.status || 'stopped',
  });
  const [isCompletionModalVisible, setCompletionModalVisible] = useState(false);
  const [isHalfwayModalVisible, setHalfwayModalVisible] = useState(false); // Halfway alert state
  const intervalRef = useRef(null);
  const { dispatch } = useTimer();

  const debugLog = (message) => {
    console.log(`Timer (${timer.name}): ${message}`);
  };

  useEffect(() => {
    debugLog(`Status changed to: ${localTimer.status}`);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (localTimer.status === 'running') {
      debugLog('Starting countdown');
      intervalRef.current = setInterval(() => {
        setLocalTimer((prevTimer) => {
          const newRemainingTime = prevTimer.remainingTime - 1;
          debugLog(`Remaining time: ${newRemainingTime}`);

          if (newRemainingTime === Math.floor(timer.duration / 2)) {
            // Show halfway alert
            debugLog('Reached halfway point!');
            setHalfwayModalVisible(true);
          }

          if (newRemainingTime <= 0) {
            debugLog('Timer completed');
            clearInterval(intervalRef.current);

            dispatch({
              type: 'ADD_TO_HISTORY',
              payload: {
                id: timer.id,
                timerName: timer.name,
                completedAt: new Date().toISOString(),
              },
            });

            setCompletionModalVisible(true); // Show completion modal
            return {
              ...prevTimer,
              remainingTime: 0,
              status: 'completed',
            };
          }

          return { ...prevTimer, remainingTime: newRemainingTime };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [localTimer.status]);

  const handleModalClose = () => {
    setCompletionModalVisible(false);
  };

  const handleHalfwayModalClose = () => {
    setHalfwayModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{localTimer.name}</Text>
      <Text>Status: {localTimer.status}</Text>
      <Text>Remaining Time: {localTimer.remainingTime} seconds</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${(localTimer.remainingTime / timer.duration) * 100}%` }]} />
      </View>

      <View style={styles.buttonContainer}>
        {localTimer.status !== 'running' && <Button title="Start" onPress={() => setLocalTimer({ ...localTimer, status: 'running' })} color="#4CAF50" />}
        {localTimer.status === 'running' && <Button title="Pause" onPress={() => setLocalTimer({ ...localTimer, status: 'paused' })} color="#FFA500" />}
        <Button title="Reset" onPress={() => setLocalTimer({ ...localTimer, remainingTime: timer.duration, status: 'stopped' })} color="#FF0000" />
      </View>

      {/* Halfway Modal */}
      <Modal
        visible={isHalfwayModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleHalfwayModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>You've reached the halfway point of timer "{timer.name}"!</Text>
            <TouchableOpacity onPress={handleHalfwayModalClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Completion Modal */}
      <Modal
        visible={isCompletionModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Timer "{timer.name}" completed!</Text>
            <TouchableOpacity onPress={handleModalClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginTop: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TimerItem;
