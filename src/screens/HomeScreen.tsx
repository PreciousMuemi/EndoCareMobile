import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome6';

const {width} = Dimensions.get('window');
const HEADER_HEIGHT = 50;
const CAROUSEL_ITEM_WIDTH = width * 0.8;

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

    const renderBlog = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('BlogDetail', {blogId: item.id})} style={styles.blogCard}>
            <Image source={{uri: item.image}} style={styles.blogImage} />
            <View style={styles.blogInfo}>
                <Text style={styles.blogTitle}>{item.title}</Text>
                <View style={styles.blogDetails}>
                    <Icon name="book-information-variant" size={16} color="#114232" style={styles.icon} />
                    <Text style={styles.blogDate}>{item.date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('ItemDetail', {itemId: item.id})} style={styles.blogCard}>
            <Image source={{uri: item.image}} style={styles.blogImage} />
            <View style={styles.blogInfo}>
                <Text style={styles.blogTitle}>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    const mockBlogs = Array.from({length: 5}, (_, i) => ({
        id: i,
        title: `Blog ${i + 1}`,
        date: '2024-01-01',
        image: `https://picsum.photos/200/300?random=${i}`,
    }));

    const mockExercises = Array.from({length: 5}, (_, i) => ({
        id: i,
        title: `Exercise ${i + 1}`,
        image: `https://picsum.photos/200/300?random=${i}`,
    }));

    const mockDidYouKnow = Array.from({length: 5}, (_, i) =>({
        id: i,
        title: `Did you know ${i + 1}`,
        image: `https://picsum.photos/200/300?random=${i}`,
    }));

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

            <TouchableOpacity onPress={() => navigation.navigate('BlogList')} style={styles.sectionHeader}>
                <Icon name="book-information-variant" size={24} color="#114232" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Latest Blogs</Text>
                <Icon name="chevron-double-right" size={24} color="#114232" style={styles.sectionArrow} />
            </TouchableOpacity>
            <FlatList data={mockBlogs} renderItem={renderBlog} keyExtractor={item => item.id.toString} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselList} snapToInterval={CAROUSEL_ITEM_WIDTH + 15} decelerationRate="fast" />

            <TouchableOpacity onPress={() => navigation.navigate('ItemList')} style={styles.sectionHeader}>
                <FontIcon name="person-running" size={24} color="#114232" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Exercises</Text>
                <Icon name="chevron-double-right" size={24} color="#114232" style={styles.sectionArrow} />
            </TouchableOpacity>
            <FlatList data={mockExercises} renderItem={renderItem} keyExtractor={item => item.id.toString} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselList} snapToInterval={CAROUSEL_ITEM_WIDTH + 15} decelerationRate="fast" />

            <TouchableOpacity onPress={() => navigation.navigate('ItemList')} style={styles.sectionHeader}>
                <Icon name="puzzle" size={24} color="#114232" style={styles.sectionIcon} />
                <Text style={styles.sectionTitle}>Did You Know?</Text>
                <Icon name="chevron-double-right" size={24} color="#114232" style={styles.sectionArrow} />
            </TouchableOpacity>
            <FlatList data={mockDidYouKnow} renderItem={renderItem} keyExtractor={item => item.id.toString} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselList} snapToInterval={CAROUSEL_ITEM_WIDTH + 15} decelerationRate="fast" />

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
    blogCard: {
        width: CAROUSEL_ITEM_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginRight: 15,
        elevation: 3,
        overflow: 'hidden',
    },
    blogImage: {
        width: '100%',
        height: 180,
    },
    blogInfo: {
        padding: 15,
    },
    blogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    blogDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    icon: {
        marginRight: 5,
    },
    blogDate: {
        fontSize: 14,
        color: '#666',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#e8e8e8',
    },
    sectionIcon: {
        marginRight: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    sectionArrow: {
        marginLeft: 10,
    },
    carouselList: {
        paddingLeft: 15,
        paddingVertical: 15,
    },
});

export default HomeScreen;