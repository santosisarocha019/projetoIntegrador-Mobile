import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles'; 

const Sensores = () => {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensores = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('https://isarocha.pythonanywhere.com/api/sensores/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setSensores(data);
      } catch (error) {
        console.error('Erro ao buscar os sensores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensores();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Sensores</Text>
      <FlatList
        data={sensores}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.sensorItem}>
            <Text style={styles.sensorText}>ID: {item.id}</Text>
            <Text style={styles.sensorText}>Tipo: {item.tipo}</Text>
            <Text style={styles.sensorText}>Localização: {item.localizacao}</Text>
            <Text style={styles.sensorText}>Responsável: {item.responsavel}</Text>
            <Text style={styles.sensorText}>Longitude: {item.longitude}</Text>
            <Text style={styles.sensorText}>Latitude: {item.latitude}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Sensores;
