import { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, TextInput, Text } from 'react-native-paper';
import firebase from '../services/connectionFirebase';

export default function Login({ changeStatus }: any) {
    //tipo recebe padrão logado

    const [type, setType] = useState<'Login' | 'Cadastro'>('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (type === 'Login') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(user.user?.uid);
                }).catch((err) => {

                    console.log(err);

                    alert('Email ou senha não cadastrados!');

                    return;

                });
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((user) => {
                    changeStatus(null)
                    setType('Login');
                })
                .catch((err) => {
                    console.log(err);
                    alert('Erro ao Cadastrar!');
                    return;
                });
        }
    }

    const handleType = () => {
        if (type === 'Login') {
            setType('Cadastro');
        } else {
            setType('Login');
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/login-logo.png')} />
            <Card style={styles.card}>
                <Card.Title title={type} titleVariant='titleLarge' titleStyle={styles.cardTitle} subtitle="" />
                <Card.Content>
                    <Text variant="bodyMedium" children></Text>
                    <TextInput
                        style={styles.label}
                        mode="outlined"
                        label="Email"
                        outlineColor="#3a7dc9"
                        activeOutlineColor="#3a7dc9"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                    <TextInput
                        style={styles.label}
                        mode="outlined"
                        label="Senha"
                        secureTextEntry
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        outlineColor="#3a7dc9"
                        activeOutlineColor="#3a7dc9"
                    />
                </Card.Content>
            </Card>
            <TouchableOpacity
                onPress={handleLogin}
                style={[styles.handleLogin,
                { backgroundColor: type === 'Login' ? '#468284' : '#141414' }]}>
                <Text style={styles.loginText}>{type === 'Login' ? 'Login' : 'Cadastrar'} </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 30 }} onPress={handleType}>
                <Text style={{ textAlign: 'center' }}>{type === 'Login' ? 'Criar uma conta' : 'Acessar'} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        textAlign: 'center',
        padding: 15
    },
    logo: {
        width: 150,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 50,
    },
    label: {
        marginBottom: 10,
        color: 'red',
    },
    loginText: {
        color: '#fff',
        fontSize: 24,
    },
    card: {
        backgroundColor: 'white',
        marginTop: 40
    },
    cardTitle: {
        textAlign: 'center'
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginTop: 30
    }
});