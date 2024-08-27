import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 50;

const getGreetingInfo = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', icon: 'weather-sunny' };
    if (hour < 18) return { text: 'Good Afternoon', icon: 'weather-hazy' };
    if (hour < 20) return { text: 'Good Evening', icon: 'weather-sunset' };
    return { text: 'Good Night', icon: 'weather-night' };
}

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const greetingInfo = getGreetingInfo();

    const renderListItem = ({ item }) => (
        <View style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.listItemImage} />
            <Text style={styles.listItemTitle}>{item.title}</Text>
        </View>
    );

    const blogs = [
        { title: 'Understanding Menstrual Cycles', image: 'https://via.placeholder.com/150' },
        { title: 'Healthy Habits During Periods', image: 'https://via.placeholder.com/150' },
    ];

    const exercises = [
        { title: 'Yoga for Period Pain', image: 'https://via.placeholder.com/150' },
        { title: 'Simple Stretches', image: 'https://via.placeholder.com/150' },
    ];

    const didYouKnow = [
        { title: 'Did you know? Menstrual cycles can...', image: 'https://via.placeholder.com/150' },
        { title: 'Interesting Facts About Periods', image: 'https://via.placeholder.com/150' },
    ];

    return (
        <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
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

            {/* Blogs Horizontal List */}
            <View style={styles.listSection}>
                <Text style={styles.sectionTitle}>Blogs</Text>
                <FlatList
                    data={blogs}
                    renderItem={renderListItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Exercises Horizontal List */}
            <View style={styles.listSection}>
                <Text style={styles.sectionTitle}>Exercises</Text>
                <FlatList
                    data={exercises}
                    renderItem={renderListItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Did You Know Horizontal List */}
            <View style={styles.listSection}>
                <Text style={styles.sectionTitle}>Did You Know?</Text>
                <FlatList
                    data={didYouKnow}
                    renderItem={renderListItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            {/* Chat Button */}
            <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('Chat')}>
                <Icon name="chat-outline" size={30} color="#fff" />
            </TouchableOpacity>
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
    listSection: {
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#114232',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    listItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        paddingBottom: 10,
        marginHorizontal: 10,
        width: 150,
        alignItems: 'center',
    },
    listItemImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    listItemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#114232',
        padding: 10,
    },
    chatButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#e83e8c',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

export default HomeScreen;