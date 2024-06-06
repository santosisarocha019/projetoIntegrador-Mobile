import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Temperatura = ({ navigation }) => {

  const temperatura = Math.floor(Math.random() * (30 - 20 + 1)) + 20; 
  
  const umidade = Math.floor(Math.random() * (100 - 50 + 1)) + 50; 
  const iluminosidade = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000; 

  
  const data = {
    labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        data: [20, 30, 28, 35, 24, 27], 
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Seus dados da Sala: A103</Text>
      <Text style={styles.dataText}>Temperatura: {temperatura}°C</Text>
      <Text style={styles.dataText}>Umidade: {umidade}%</Text>
      <Text style={styles.dataText}>Iluminosidade: {iluminosidade} lux</Text>
      
      <LineChart
        data={data}
        width={300}
        height={200}
        yAxisSuffix="ºC"
        chartConfig={{
          backgroundColor: '#2596be',
          backgroundGradientFrom: '#2596be',
          backgroundGradientTo: '#92c1ba',
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
      
      <TouchableOpacity onPress={() => navigation.navigate('Mapa')} style={styles.button}>
        <Text style={styles.buttonText}>Mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 10,
  },
  chart: {
    marginTop: 20,
    borderRadius: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2596be',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Temperatura;
