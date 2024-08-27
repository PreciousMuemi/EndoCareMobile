import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({ navigation }) => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.settingItem}>
                    <Text style={styles.settingLabel}>Notifications</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={toggleNotifications}
                        trackColor={{ false: '#767577', true: '#87A922' }}
                        thumbColor={notificationsEnabled ? '#f4f3f4' : '#f4f3f4'}
                    />
                </View>

                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('privacy')}>
                    <Text style={styles.settingLabel}>Privacy Policy</Text>
                    <Icon name="chevron-right" size={20} color="#114232" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.settingLabel}>Terms and Conditions</Text>
                    <Icon name="chevron-right" size={20} color="#114232" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('contact')}>
                    <Text style={styles.settingLabel}>Contact Us</Text>
                    <Icon name="chevron-right" size={20} color="#114232" />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollContent: {
        paddingBottom: 80,  // Extra padding to make room for the chat button
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    settingLabel: {
        fontSize: 16,
        color: '#114232',
    },
});

export default SettingsScreen;
