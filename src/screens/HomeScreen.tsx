import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const HEADER_HEIGHT = 50;
const CAROSEL_ITEM_WIDTH = width * 0.8;

const getGreetingInfo = () => {
    const hour = new Date().getHours();
    if (hour < 12) return {text: 'Good Morning', icon: 'weather-sunny'};
    if (hour < 18) return {text: 'Good Afternoon', icon: 'weather-hazy'}
    if (hour < 20) return {text: 'Good Evening', icon: 'weather-sunset'}
    return {text: 'Good Night', icon: 'weather-night'}
}

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const greetingInfo = getGreetingInfo();

    return (
        <ScrollView style={[styles.container, {paddingTop: insets.top}]}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>EndoCare</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="bell" size={20} color="#114232" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerIcon}>
                        <Icon name="account-supervisor-circle-outline" size={20} color="#114232" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.greetingSection}>
                <View style={styles.greetingIconContainer}>
                    <Icon name={greetingInfo.icon} size={40} color="#114232" />
                </View>
                <View style={styles.greetingTextContainer}>
                    <Text style={styles.greetingText}>{greetingInfo.text} Baby girl</Text>
                    <Text style={styles.greetingSubtext}>How are you feeling today?</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        height: HEADER_HEIGHT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: '#114232',
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerIcon: {
        marginLeft: 15,
    },
    greetingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    greetingIconContainer: {
        backgroundColor: '#F7F6BB',
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    greetingTextContainer: {
        flex: 1,
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#114232',
    },
    greetingSubtext: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
});

export default HomeScreen;