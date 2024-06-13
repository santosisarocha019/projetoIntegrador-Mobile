import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login({ navigation, setIsSignedIn }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (token) {
            AsyncStorage.setItem('token', token)
                .then(() => {
                    console.log("Token SignIn: ", token);
                    console.log("Token sucesso!");
                    setIsSignedIn(true); 
                })
                .catch((erro) => {
                    console.error("Erro: ", erro);
                });
        }
    }, [token]);

    const fetchToken = async () => {
        try {
            const response = await axios.post(
                'https://isarocha.pythonanywhere.com/api/token/',
                {
                    username: user,
                    password: password
                }
            );
            console.log(response.data.access);
            setToken(response.data.access);
        } catch (erro) {
            console.error("Deu Erro:", erro);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View>
                    <Text style={styles.title}>Login</Text>
                </View>
                <TextInput
                    placeholder='user'
                    onChangeText={setUser}
                    value={user}
                    style={styles.caixa}
                />
                <TextInput
                    placeholder='password'
                    onChangeText={setPassword}
                    value={password}
                    style={styles.caixa}
                    secureTextEntry={true}
                />
                <Pressable
                    style={styles.btnOk}
                    onPress={fetchToken}
                >
                    <Text style={{ fontSize: 25, color: 'white' }}>Sign In</Text>
                </Pressable>
               
            </View>
        </View>
    );
}
