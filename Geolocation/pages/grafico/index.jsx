import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles'; // Importar os estilos atualizados

const Grafico = ({ navigation }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const getTokenAndFetchData = async () => {
      try {
        const tokenY = await AsyncStorage.getItem('token');
        console.log('Token lido:', tokenY);
        setToken(tokenY);
        if (tokenY) {
          fetchTemperatureData(tokenY);
        }
      } catch (error) {
        console.error('Erro ao recuperar token:', error);
      }
    };
    getTokenAndFetchData();
  }, []);

  const fetchTemperatureData = async (token) => {
    const body = {
      sensor_id: 9,
      valor_gte: 10,
      valor_lt: 19,
      timestamp_gte: "2024-04-01T00:00:00",
      timestamp_lt: "2024-04-02T00:00:00"
    };

    try {
      const response = await fetch(`https://isarocha.pythonanywhere.com/api/temperatura_filter/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (data.length > 0) {
        const temperatures = data.map(entry => entry.valor);
        setTemperatureData(temperatures);
      } else {
        console.log('No temperature data found');
        setTemperatureData([]);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados de temperatura:', error);
    }
  };

  const data = {
    labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        data: temperatureData,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seus dados da Sala: A103</Text>
      <LineChart
        data={data}
        width={300}
        height={200}
        yAxisSuffix="ºC"
        chartConfig={{
          backgroundColor: '#D0D1FF', // roxo claro
          backgroundGradientFrom: '#D0D1FF', // roxo claro
          backgroundGradientTo: '#8B8DFE', // tom mais escuro de roxo claro
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

export default Grafico;
