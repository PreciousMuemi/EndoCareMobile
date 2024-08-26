import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Animatable.View animation="bounceIn" style={styles.logoContainer}>
                <Image source={require('../assets/endologo.png')} style={styles.logo} />
                <Text style={styles.logoText}>EndoCare</Text>
            </Animatable.View>
            <Animatable.View style={styles.buttonContainer}>
                <TouchableOpacity
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logoContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 400,
    },
    logoText: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
    },
    googleButton: {
        ba
    }
});

export default WelcomeScreen;