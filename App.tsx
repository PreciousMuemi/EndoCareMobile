import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const App: React.FC = () => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>EndoCare</Text>

      <Calendar
        onDayPress={(day: { dateString: React.SetStateAction<string>; }) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
      />

      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.lightButton]} onPress={() => addCycleDay('light')}>
          <Text style={styles.buttonText}>Light Flow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.mediumButton]} onPress={() => addCycleDay('medium')}>
          <Text style={styles.buttonText}>Medium Flow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.heavyButton]} onPress={() => addCycleDay('heavy')}>
          <Text style={styles.buttonText}>Heavy Flow</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.symptomContainer}>
        {['Cramps', 'Headache', 'Fatigue', 'Bloating'].map((symptom) => (
          <TouchableOpacity
            key={symptom}
            style={[styles.symptomButton, symptoms.includes(symptom) && styles.selectedSymptom]}
            onPress={() => toggleSymptom(symptom)}
          >
            <Text style={styles.symptomText}>{symptom}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.predictionContainer}>
        <Text style={styles.predictionText}>Predicted Next Period: {predictNextPeriod()}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  selectedDateContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedDateText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  lightButton: { backgroundColor: '#FFC0CB' },
  mediumButton: { backgroundColor: '#FF69B4' },
  heavyButton: { backgroundColor: '#FF1493' },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  symptomContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  symptomButton: {
    margin: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  selectedSymptom: {
    backgroundColor: '#add8e6',
  },
  symptomText: {
    color: 'black',
  },
  predictionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  predictionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
