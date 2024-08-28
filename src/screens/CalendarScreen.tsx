import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <View style={styles.container}>
      <View style={styles.calendarHeader}>
        <TouchableOpacity>
          <Icon name="chevron-left" size={30} color="#4a69bd" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={30} color="#4a69bd" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarPlaceholder}>
        <Text style={styles.placeholderText}>Calendar Component</Text>
        <Text>
          Integrate a calendar library here, e.g., react-native-calendars
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendarPlaceholder: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a69bd',
    marginBottom: 10,
  },
  eventsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  eventsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  eventInfo: {
    marginLeft: 15,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default CalendarScreen;
