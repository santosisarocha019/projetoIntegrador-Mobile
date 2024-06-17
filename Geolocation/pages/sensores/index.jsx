import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

const Sensores = () => {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tipo, setTipo] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  useEffect(() => {
    fetchSensores();
  }, []);

  const fetchSensores = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      let url = 'https://isarocha.pythonanywhere.com/api/sensores/';

      // Adiciona parâmetros de filtro à URL
      const params = [];
      if (tipo) params.push(`tipo=${tipo}`);
      if (localizacao) params.push(`localizacao=${localizacao}`);
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }

      const response = await fetch(url, {
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

  const handleApplyFilters = () => {
    fetchSensores();
  };

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

      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tipo"
          value={tipo}
          onChangeText={setTipo}
        />
        <TextInput
          style={styles.input}
          placeholder="Localização"
          value={localizacao}
          onChangeText={setLocalizacao}
        />
        <Button title="Aplicar Filtros" onPress={handleApplyFilters} />
      </View>

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
