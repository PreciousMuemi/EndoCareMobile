import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';

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
                <Text style={styles.contactInfo} onPress={() => Linking.openURL('mailto:support@yourapp.com')}>
                    support@yourapp.com
                </Text>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Phone Support</Text>
                <Text style={styles.contactInfo} onPress={() => Linking.openURL('tel:+1234567890')}>
                    +1 234 567 890
                </Text>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Mailing Address</Text>
                <Text style={styles.contactInfo}>123 App Street, Suite 456, Your City, Country</Text>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Follow Us</Text>
                <View style={styles.socialMedia}>
                    <Text style={styles.socialMediaLink} onPress={() => Linking.openURL('https://facebook.com/yourapp')}>Facebook</Text>
                    <Text style={styles.socialMediaLink} onPress={() => Linking.openURL('https://twitter.com/yourapp')}>Twitter</Text>
                    <Text style={styles.socialMediaLink} onPress={() => Linking.openURL('https://instagram.com/yourapp')}>Instagram</Text>
                </View>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.sectionTitle}>Send Us Feedback</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Subject"
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Message"
                    multiline
                />
                <Button title="Submit" onPress={handleSubmit} />
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
        color: '#007bff',
    },
    socialMedia: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    socialMediaLink: {
        fontSize: 16,
        color: '#007bff',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    textArea: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    footer: {
        fontSize: 14,
        color: '#333',
        marginTop: 20,
    },
    link: {
        color: '#007bff',
    },
});

export default ContactUsScreen;
