import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>

      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'green'}
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default CalendarScreen;
