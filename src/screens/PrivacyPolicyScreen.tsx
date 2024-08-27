import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Privacy Policy</Text>
            <Text style={styles.content}>
                [Insert Privacy Policy Content Here]
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

export default PrivacyPolicyScreen;
