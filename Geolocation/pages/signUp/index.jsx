import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [erro, setErro] = useState(null);


  const fetchToken = async () => {
    try {
      const response = await axios.post('https://isarocha.pythonanywhere.com/api/token/', {
        username: usuario,
        password: password,
        email: email
      });


      await AsyncStorage.setItem('token', response.data.access);

   
      navigation.navigate('Mapa');

    } catch (error) {
      console.error('Erro ao obter token:', error);
      setErro('Usuário ou senha inválidos. Verifique suas credenciais.');
    }
  };


  const createUser = async () => {
    try {

      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setErro('Token de acesso não encontrado. Faça login novamente.');
        return;
      }


      const response = await axios.post('https://isarocha.pythonanywhere.com/api/create_user', {
  
        username: usuario,
        password: password,
        email: email
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });


      navigation.navigate('Mapa');

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setErro('Erro ao tentar criar usuário. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Criar Usuário</Text>

        <View style={styles.campos}>
          <Text style={styles.texto2}>Nome:</Text>
          <TextInput
            style={styles.textoNomeEmail}
            onChangeText={setUsuario}
            value={usuario}
          />
          <Text style={styles.texto2}>email:</Text>
          <TextInput
            style={styles.textoNomeEmail}
            onChangeText={setemail}
            value={email}
          />
          
          <Text style={styles.texto2}>Senha:</Text>
          <TextInput
            style={styles.addNew}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.btnBtn}>
          <Pressable
            style={styles.btn}
            onPress={createUser} 
          >
            <Text style={styles.btnCadastrar}>Criar Usuário</Text>
          </Pressable>
        </View>

        {erro && (
          <View style={{ width: "80%" }}>
            <Text style={styles.textoErro}>{`Erro: ${erro}`}</Text>
          </View>
        )}
        </View>
    </View>
  );
}
