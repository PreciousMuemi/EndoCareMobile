import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

const WelcomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Animatable.View animation="bounceIn" style={styles.logoContainer}>
                <Image source={require('../assets/endologo.png')} style={styles.logo} />
                <Text style={styles.logoText}>EndoCare</Text>
            </Animatable.View>
            <Animatable.View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Icon name="google" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Continue With Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                    <Icon name="envelope" size={18} color="#fff" />
                    <Text style={styles.buttonText}>Continue With Email</Text>
                </TouchableOpacity>
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
        width: 300,
        height: 300,
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
    button: {
        backgroundColor: '#114232',
        width: '80%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 22,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;