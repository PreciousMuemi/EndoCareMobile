import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Animated, KeyboardAvoidingView, ActivityIndicator, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontIcon from 'react-native-vector-icons/FontAwesome6';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { GoogleGenerativeAI } from "@google/generative-ai";
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const HEADER_HEIGHT = 50;
const CAROUSEL_ITEM_WIDTH = width * 0.8;
const DRAWER_HEIGHT = height * 0.7;

const genAI = new GoogleGenerativeAI('AIzaSyDYRxxlVXM4J5H52I-69miLQWZ_06u-pMM')

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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const drawerAnimation = useRef(new Animated.Value(0)).current;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            const savedMessages = await AsyncStorage.getItem('chatMessages');
            if (savedMessages !== null) {
                setMessages(JSON.parse(savedMessages));
            } else {
                // If no saved messages, add a welcome message
                const welcomeMessage = {
                    _id: 1,
                    text: "Hello! I'm EndoBot. How can I assist you with endometriosis today?",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'EndoBot',
                        avatar: 'https://placeimg.com/140/140/tech',
                    },
                };
                setMessages([welcomeMessage]);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const saveMessages = async (messagesToSave) => {
        try {
            await AsyncStorage.setItem('chatMessages', JSON.stringify(messagesToSave));
        } catch (error) {
            console.error('Error saving messages:', error);
        }
    };

    const toggleDrawer = () => {
        const toValue = isDrawerOpen ? 0 : 1;
        Animated.spring(drawerAnimation, {
            toValue,
            useNativeDriver: true,
        }).start();
        setIsDrawerOpen(!isDrawerOpen);
    };

    const onSend = useCallback(async (newMessages = []) => {
        setIsLoading(true);
        const updatedMessages = GiftedChat.append(messages, newMessages);
        setMessages(updatedMessages);
        saveMessages(updatedMessages);

        const userMessage = newMessages[0].text;

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-flash" });
            const result = await model.generateContent(userMessage);
            const response = result.response;
            const text = response.text();

            const botMessage = {
                _id: Math.round(Math.random() * 1000000),
                text: text,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Endo',
                    avatar: 'https://placeimg.com/140/140/tech',
                },
            };

            const newUpdatedMessages = GiftedChat.append(updatedMessages, [botMessage]);
            setMessages(newUpdatedMessages);
            saveMessages(newUpdatedMessages);
        } catch (error) {
            console.error("Error generating response:", error);
            // Add an error message to the chat
            const errorMessage = {
                _id: Math.round(Math.random() * 1000000),
                text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'EndoBot',
                    avatar: 'https://placeimg.com/140/140/tech',
                },
            };
            const newUpdatedMessages = GiftedChat.append(updatedMessages, [errorMessage]);
            setMessages(newUpdatedMessages);
            saveMessages(newUpdatedMessages);
        } finally {
            setIsLoading(false);
        }
    }, [messages]);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#F7F6BB',
                    },
                    left: {
                        backgroundColor: '#E8E8E8',
                    },
                }}
                textStyle={{
                    right: {
                        color: '#114232',
                    },
                    left: {
                        color: '#114232',
                    },
                }}
            />
        );
    };

    const renderInputToolbar = (props) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: '#fff',
                    borderTopColor: '#E8E8E8',
                    borderTopWidth: 1,
                    padding: 8,
                }}
            />
        );
    };

    const drawerTranslateY = drawerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [DRAWER_HEIGHT, 0],
    });

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

    const mockBlogs = [
        {
            id: 1,
            title: 'Understanding Endometriosis',
            date: 'July 10, 2024',
            image: 'https://plus.unsplash.com/premium_photo-1702598564277-0984e20bafb7?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Learn about the symptoms and management of endometriosis.',
          },
          {
            id: 2,
            title: 'Living with Endometriosis',
            date: 'July 12, 2024',
            image: 'https://plus.unsplash.com/premium_photo-1661573742366-5b83baca6671?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Tips and advice for daily life with endometriosis.',
          },
          {
            id: 3,
            title: 'Managing Pain with Endometriosis',
            date: 'July 15, 2024',
            image: 'https://plus.unsplash.com/premium_photo-1661593432672-8d3e350eb5a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Effective pain management strategies for endometriosis.',
          },
          {
            id: 4,
            title: 'Endometriosis Treatments',
            date: 'July 18, 2024',
            image: 'https://plus.unsplash.com/premium_photo-1702599088583-d6d0649d1a66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Explore different treatment options for endometriosis.',
          },
          {
            id: 5,
            title: 'Empowering Your Endometriosis Journey',
            date: 'July 22, 2024',
            image: 'https://images.unsplash.com/photo-1580828476460-d1c11a6704bc?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'How to take control and live well with endometriosis.',
          },
    ];

    const mockExercises = Array.from({length: 5}, (_, i) => ({
        id: i,
        title: `Exercise ${i + 1}`,
        image: `https://plus.unsplash.com/premium_photo-1675691165834-4ba30901e4bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
    }));

    const mockDidYouKnow = Array.from({length: 5}, (_, i) =>({
        id: i,
        title: `Insight${i + 1}`,
        image: `https://picsum.photos/200/300?random=${i}`,
    }));

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>EndoCare</Text>
                    <View style={styles.headerIcons}>
                        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.headerIcon}>
                            <Icon name="bell" size={20} color="#114232" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.headerIcon}>
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
                <FlatList
                    data={mockBlogs}
                    renderItem={renderBlog}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselList}
                    snapToInterval={CAROUSEL_ITEM_WIDTH + 15}
                    decelerationRate="fast"
                />

                <TouchableOpacity onPress={() => navigation.navigate('ItemList')} style={styles.sectionHeader}>
                    <FontIcon name="person-running" size={24} color="#114232" style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Exercises</Text>
                    <Icon name="chevron-double-right" size={24} color="#114232" style={styles.sectionArrow} />
                </TouchableOpacity>
                <FlatList
                    data={mockExercises}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselList}
                    snapToInterval={CAROUSEL_ITEM_WIDTH + 15}
                    decelerationRate="fast"
                />

                <TouchableOpacity onPress={() => navigation.navigate('ItemList')} style={styles.sectionHeader}>
                    <Icon name="puzzle" size={24} color="#114232" style={styles.sectionIcon} />
                    <Text style={styles.sectionTitle}>Insights</Text>
                    <Icon name="chevron-double-right" size={24} color="#114232" style={styles.sectionArrow} />
                </TouchableOpacity>
                <FlatList
                    data={mockDidYouKnow}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.carouselList}
                    snapToInterval={CAROUSEL_ITEM_WIDTH + 15}
                    decelerationRate="fast"
                />
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.chatbotIcon,
                    isDrawerOpen && styles.chatbotIconActive
                ]}
                onPress={toggleDrawer}
            >
                <Icon name={isDrawerOpen ? "close" : "chat"} size={30} color="#114232" />
            </TouchableOpacity>

            <Animated.View style={[
                styles.drawer,
                { transform: [{ translateY: drawerTranslateY }] }
            ]}>
                <View style={styles.drawerHeader}>
                    <Text style={styles.drawerTitle}>Chat with EndoBot</Text>
                    <TouchableOpacity onPress={toggleDrawer}>
                        <Icon name="chevron-down" size={24} color="#114232" />
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                >
                    <GiftedChat
                        messages={messages}
                        onSend={newMessages => onSend(newMessages)}
                        user={{ _id: 1 }}
                        renderBubble={renderBubble}
                        renderInputToolbar={renderInputToolbar}
                        isLoadingEarlier={isLoading}
                        renderLoading={() => <ActivityIndicator size="large" color="#114232" />}
                    />
                </KeyboardAvoidingView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    chatbotIcon: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#F7F6BB',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    chatbotIconActive: {
        backgroundColor: '#114232',
    },
    drawer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: DRAWER_HEIGHT,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    drawerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#114232',
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