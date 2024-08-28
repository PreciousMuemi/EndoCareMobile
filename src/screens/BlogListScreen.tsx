import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const BlogListScreen = ({navigation}) => {
  const renderEvent = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('BlogDetail', {blogId: item.id})}  style={styles.eventCard}>
      <Image source={{uri: item.image}} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventDetails}>
          <Icon name="calendar" size={16} color="#666" style={styles.icon} />
          <Text style={styles.eventDate}>{item.date}</Text>
        </View>
        <Text style={styles.eventDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const mockEvents = Array.from({length: 5}, (_, i) => ({
    id: i,
    title: `Blog ${i + 1}`,
    date: `July ${10 + i}, 2024`,
    image: `https://picsum.photos/200/300?random=${i}`,
    description:
      'Find out more with us today.',
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEvents}
        renderItem={renderEvent}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  eventList: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden',
  },
  eventImage: {
    width: '100%',
    height: 150,
  },
  eventInfo: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  eventDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
  icon: {
    marginRight: 5,
  },
});

export default BlogListScreen;
