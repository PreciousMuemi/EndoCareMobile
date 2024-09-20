import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [periodModalVisible, setPeriodModalVisible] = useState(false);
  const [periodDetails, setPeriodDetails] = useState({ cycleDays: '', periodDuration: '', startDate: '' });
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean; dotColor: string } }>({});

  const handleDayPress = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setMedications([...medications, newMedication]);
      setNewMedication('');
      setModalVisible(false);
    }
  };

  const deleteMedication = (index: number) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(false);
    setStartDate(currentDate);
    setPeriodDetails({ ...periodDetails, startDate: currentDate?.toDateString() || '' });
  };


  const highlightPeriodDates = () => {
    if (startDate && periodDetails.periodDuration) {
      const start = new Date(startDate);
      const periodDays = parseInt(periodDetails.periodDuration, 10);
      const newMarkedDates = { ...markedDates };

      for (let i = 0; i < periodDays; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        newMarkedDates[dateString] = { marked: true, dotColor: '#114232' };
      }

      setMarkedDates(newMarkedDates);
      setPeriodModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Period Tracker</Text>

      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#f28c8c' },
        }}
        theme={{
          selectedDayBackgroundColor: '#f8b4b4',
          todayTextColor: '#114232',
          arrowColor: '#114232',
          dotColor: '#114232',
        }}
      />

      <Text style={styles.funMessage}>“Remember: You're stronger than you think baby girl!”</Text>

      <View style={styles.details}>
        <Text style={styles.detailsHeader}>Details for {selectedDate || 'Select a date'}</Text>
        <FlatList
          data={medications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.medicationItem}>
              <Text style={styles.medicationtext}>{item}</Text>
              <TouchableOpacity onPress={() => deleteMedication(index)}>
                <Text style={styles.deleteButton}>🗑</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {medications.length === 0 && <Text style={styles.medicationtext}>No medications for this day.</Text>}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={() => setPeriodModalVisible(true)}>
        <Text style={styles.buttonText}>Set Period</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Medication</Text>
      </TouchableOpacity>

      {/* Modal for Adding Medications */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add Medication</Text>
            <TextInput
              placeholder="Medication Name"
              placeholderTextColor = "#333"
              style={styles.input}
              value={newMedication}
              onChangeText={setNewMedication}
            />
            
            <TouchableOpacity style={styles.saveButton} onPress={addMedication}>
              <Text style={styles.buttonText}>Add medication</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Setting Period Details */}
      <Modal visible={periodModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Set Period Details</Text>

            <TextInput
              placeholder="Cycle Days"
              placeholderTextColor = "#333"
              keyboardType="numeric"
              style={styles.input}
              value={periodDetails.cycleDays}
              onChangeText={(text) => setPeriodDetails({ ...periodDetails, cycleDays: text })}
            />
            <TextInput
              placeholder="Period Duration"
              placeholderTextColor = "#333"
              keyboardType="numeric"
              style={styles.input}
              value={periodDetails.periodDuration}
              onChangeText={(text) => setPeriodDetails({ ...periodDetails, periodDuration: text })}
            />

            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>
                {startDate ? startDate.toDateString() : 'Select Start Date'}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity style={styles.saveButton} onPress={highlightPeriodDates}>
              <Text style={styles.buttonText}>Save details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setPeriodModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#fcbe03',
  },
  details: {
    marginTop: 20,
  },
  detailsHeader: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  funMessage: {
    marginTop: 16,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#fcbe03',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    shadowColor: '#333',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 16,
    color: '#fcbe03',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    paddingHorizontal: 8,
    color: '#333',
    paddingVertical: 4,
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  medicationtext: {
    color: '#333',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: '#ff5c5c',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#114232',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#87A922',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalendarScreen;