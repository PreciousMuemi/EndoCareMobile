import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const ItemListScreen = ({navigation}) => {
  const renderEvent = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', {itemId: item.id})}  style={styles.eventCard}>
      <Image source={{uri: item.image}} style={styles.eventImage} />
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Text style={styles.eventDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const mockEvents = Array.from({length: 5}, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    image: `https://picsum.photos/200/300?random=${i}`,
    description:
      'FItem details.',
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

export default ItemListScreen;
