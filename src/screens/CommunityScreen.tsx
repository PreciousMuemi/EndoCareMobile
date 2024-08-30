import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommunityScreen = () => {
  const [allNotificationsEnabled, setAllNotificationsEnabled] = useState(true);

  const renderNotification = ({item}) => (
    <TouchableOpacity style={styles.notificationItem}>
      <View style={[styles.notificationIcon, {backgroundColor: item.color}]}>
        <Icon name={item.icon} size={24} color="#fff" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  const mockNotifications = [
    {
      id: 2,
      icon: 'account-group',
      color: '#6ab04c',
      text: 'Sarah commented on your post',
      time: '4 hours ago',
    },
    {
      id: 3,
      icon: 'school',
      color: '#eb4d4b',
      text: 'Reminder: Its about to rain',
      time: '1 day ago',
    },
    {
      id: 5,
      icon: 'message',
      color: '#00b894',
      text: 'New message from Endo Care',
      time: '3 days ago',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={mockNotifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#666',
  },
  notificationList: {
    padding: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    elevation: 3,
  },
  notificationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: '#666',
  },
  clearButton: {
    backgroundColor: '#114232',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommunityScreen;
