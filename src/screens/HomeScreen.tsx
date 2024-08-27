import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';

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

    const renderCarouselItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Image source={{ uri: item.image }} style={styles.carouselImage} />
            <Text style={styles.carouselTitle}>{item.title}</Text>
        </View>
    );

    const blogs = [
        { title: 'Understanding Menstrual Cycles', image: 'https://via.placeholder.com/150' },
        { title: 'Healthy Habits During Periods', image: 'https://via.placeholder.com/150' },
        // Add more blog items here
    ];

    const exercises = [
        { title: 'Yoga for Period Pain', image: 'https://via.placeholder.com/150' },
        { title: 'Simple Stretches', image: 'https://via.placeholder.com/150' },
        // Add more exercise items here
    ];

    const didYouKnow = [
        { title: 'Did you know? Menstrual cycles can...', image: 'https://via.placeholder.com/150' },
        { title: 'Interesting Facts About Periods', image: 'https://via.placeholder.com/150' },
        // Add more facts here
    ];

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

            {/* Blogs Carousel */}
            <View style={styles.carouselSection}>
                <Text style={styles.sectionTitle}>Blogs</Text>
                <Carousel
                    data={blogs}
                    renderItem={renderCarouselItem}
                    sliderWidth={width}
                    itemWidth={CAROSEL_ITEM_WIDTH}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.7}
                    loop
                />
            </View>

            {/* Exercises Carousel */}
            <View style={styles.carouselSection}>
                <Text style={styles.sectionTitle}>Exercises</Text>
                <Carousel
                    data={exercises}
                    renderItem={renderCarouselItem}
                    sliderWidth={width}
                    itemWidth={CAROSEL_ITEM_WIDTH}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.7}
                    loop
                />
            </View>

            {/* Did You Know Carousel */}
            <View style={styles.carouselSection}>
                <Text style={styles.sectionTitle}>Did You Know?</Text>
                <Carousel
                    data={didYouKnow}
                    renderItem={renderCarouselItem}
                    sliderWidth={width}
                    itemWidth={CAROSEL_ITEM_WIDTH}
                    inactiveSlideScale={0.95}
                    inactiveSlideOpacity={0.7}
                    loop
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
    carouselSection: {
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#114232',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    carouselItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
        paddingBottom: 10,
    },
    carouselImage: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
    },
    carouselTitle: {
        fontSize: 16,
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
