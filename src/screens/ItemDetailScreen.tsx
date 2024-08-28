import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const ItemDetailScreen = () => {
  // In a real app, you'd fetch the event details based on the ID passed in route.params
  const item = {
    id: 1,
    name: 'Item 1',
    description: 'This is a description.',
    image: 'https://picsum.photos/200/300?random',
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: item.image}} style={styles.eventImage} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>More</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginTop: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#114232',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ItemDetailScreen;
