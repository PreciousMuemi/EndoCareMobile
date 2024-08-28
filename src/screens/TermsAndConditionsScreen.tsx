import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const TermsAndConditionsScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Terms and Conditions</Text>
            <Text style={styles.content}>
            Welcome to EndoCare! These Terms and Conditions ("Terms") govern your use of our mobile application (the "App"). 
            By accessing or using the App, you agree to be bound by these Terms. 
            If you do not agree with these Terms, please do not use the App.
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#114232',
        marginBottom: 20,
    },
    content: {
        fontSize: 16,
        color: '#333',
    },
});

export default TermsAndConditionsScreen;
