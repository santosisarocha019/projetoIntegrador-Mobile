import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateSensor({ navigation }) {
  const [tipo, settipo] = useState('');
  const [mac_address, setmac_address] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [localizacao, setlocalizacao] = useState('');
  const [responsavel, setresponsavel] = useState('');
  const [unidade_medida, setunidade_medida] = useState('');
  const [status_operacional, setstatus_operacional] = useState('');
  const [observacao, setobservacao] = useState('');
  const [erro, setErro] = useState('');

  const CreateSensor = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        setErro('Token de acesso não encontrado. Faça login novamente.');
        return;
      }

      await axios.post('https://isarocha.pythonanywhere.com/api/sensores/', {
        tipo: tipo,
        mac_address: mac_address,
        latitude: latitude,
        longitude: longitude,
        localizacao: localizacao,
        responsavel: responsavel,
        unidade_medida: unidade_medida,
        status_operacional: status_operacional,
        observacao: observacao
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      navigation.navigate('Sensores');
    } catch (error) {
      console.error('Erro ao criar sensor:', error);
      setErro('Erro ao tentar criar sensor. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.box}>
          <Text style={styles.title}>Criar Sensores</Text>

          <View style={styles.campos}>
            <Text style={styles.texto2}>Tipo:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={settipo}
              value={tipo}
            />
            <Text style={styles.texto2}>MAC Address:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setmac_address}
              value={mac_address}
            />
            <Text style={styles.texto2}>Latitude:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setlatitude}
              value={latitude}
            />
            <Text style={styles.texto2}>Longitude:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setlongitude}
              value={longitude}
            />
            <Text style={styles.texto2}>Localização:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setlocalizacao}
              value={localizacao}
            />
            <Text style={styles.texto2}>Responsável:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setresponsavel}
              value={responsavel}
            />
            <Text style={styles.texto2}>Unidade de Medida:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setunidade_medida}
              value={unidade_medida}
            />
            <Text style={styles.texto2}>Status Operacional:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setstatus_operacional}
              value={status_operacional}
            />
            <Text style={styles.texto2}>Observação:</Text>
            <TextInput
              style={styles.textoNomeEmail}
              onChangeText={setobservacao}
              value={observacao}
            />
          </View>

          <View style={styles.btnBtn}>
            <Pressable
              style={styles.btn}
              onPress={CreateSensor} 
            >
              <Text style={styles.btnCadastrar}>Criar Sensor</Text>
            </Pressable>
          </View>

          {erro && (
            <View style={{ width: "80%" }}>
              <Text style={styles.textoErro}>{`Erro: ${erro}`}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
