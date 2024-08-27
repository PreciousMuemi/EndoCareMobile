import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    // Navigate to the edit profile screen
  };

  const handleSettings = () => {
    // Navigate to settings screen
    navigation.navigate('Settings');
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigation.navigate('welcome');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with actual user profile image
          style={styles.profilePicture}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleEditProfile}>
          <Icon name="pencil" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* User Details */}
      <Text style={styles.userName}>Jane Doe</Text>
      <Text style={styles.userEmail}>jane.doe@example.com</Text>

      {/* Cycle Information */}
      <View style={styles.cycleInfoContainer}>
        <View style={styles.cycleInfoRow}>
          <Icon name="calendar" size={20} color="#87A922" />
          <Text style={styles.cycleInfoText}>Next Period: Sept 10, 2024</Text>
        </View>
        <View style={styles.cycleInfoRow}>
          <Icon name="time" size={20} color="#87A922" />
          <Text style={styles.cycleInfoText}>Cycle Length: 28 Days</Text>
        </View>
        <View style={styles.cycleInfoRow}>
          <Icon name="water" size={20} color="#87A922" />
          <Text style={styles.cycleInfoText}>Last Period: Aug 14, 2024</Text>
        </View>
      </View>

      {/* Settings and Logout Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettings}>
          <Icon name="settings-outline" size={20} color="#ffffff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#ffffff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#f0f0f0',
  },
  profilePictureContainer: {
    marginBottom: 20,
    position: 'relative',
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#114232',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#114232',
    padding: 8,
    borderRadius: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#114232',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 30,
  },
  cycleInfoContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
    width: '80%',
  },
  cycleInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cycleInfoText: {
    fontSize: 16,
    color: '#495057',
    marginLeft: 10,
  },
  buttonsContainer: {
    width: '80%',
    alignItems: 'center',
  },
  settingsButton: {
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
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#87A922',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default ProfileScreen;
