import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, TouchableOpacity } from 'react-native';

const ContactUsScreen = () => {
    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Contact Us</Text>
            <Text style={styles.subtitle}>We'd love to hear from you. Reach out to us through any of the methods below:</Text>

            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Email Support</Text>
                <Text style={styles.contactInfo} onPress={() => Linking.openURL('mailto:support@endocare.com')}>
                    support@endocare.com
                </Text>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Send Us Feedback</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor="#333"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    placeholderTextColor="#333"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                    placeholderTextColor="#333"
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Message"
                    placeholderTextColor="#333"
                    multiline
                />
                <TouchableOpacity
                style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
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
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    contactSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#114232',
        marginBottom: 5,
    },
    contactInfo: {
        fontSize: 16,
        color: '#114232',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#333',
    },
    textArea: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
        color: '#333',
    },
    button: {
        backgroundColor: '#114232',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 14,
        color: '#333',
        marginTop: 20,
    },
    link: {
        color: '114232',
    },
});

export default ContactUsScreen;
