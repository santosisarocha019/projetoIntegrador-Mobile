import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles'; 
const { width, height } = Dimensions.get('window');

const Mapa = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [token, setToken] = useState('');
  const [loadingTemperature, setLoadingTemperature] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then((tokenY) => {
        console.log('token Read: ', tokenY)
        setToken(tokenY);
      })
      .catch(error => {
        console.error('Erro ao recuperar token:', error);
      });
  }, []);

  const bounds = {
    north: -22.9140639,
    south: -22.914251,
    west: -47.068686,
    east: -47.067987,
  };

  const fetchTemperature = async () => {
    setLoadingTemperature(true);

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
        setTemperature(data[0].valor);
      } else {
        setTemperature('No data found');
      }
    } catch (error) {
      console.error('Erro ao buscar a temperatura:', error);
    } finally {
      setLoadingTemperature(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 1000,
        distanceInterval: 1,
      }, (newLocation) => {
        setLocation(newLocation.coords);
      });
    })();
  }, []);

  useEffect(() => {
    if (location && token) {
      fetchTemperature();
    }
  }, [location, token]);

  const calculatePosition = () => {
    if (!location) return { top: '50%', left: '50%' };

    const { latitude, longitude } = location;

    if (latitude < bounds.south || latitude > bounds.north || longitude < bounds.west || longitude > bounds.east) {
      return { top: '50%', left: '50%' };
    }

    const top = ((bounds.north - latitude) / (bounds.north - bounds.south)) * 100;
    const left = ((longitude - bounds.west) / (bounds.east - bounds.west)) * 100;

    return { top: `${top}%`, left: `${left}%` };
  };

  const calculateDistance = (latitude, longitude, squareLatitude, squareLongitude) => {
    return Math.sqrt(
      Math.pow(latitude - squareLatitude, 2) + Math.pow(longitude - squareLongitude, 2)
    );
  };

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    const { latitude, longitude } = location;
    const distanceSquare1 = calculateDistance(latitude, longitude, bounds.south + 0.15, bounds.west + 0.15);
    const distanceSquare2 = calculateDistance(latitude, longitude, bounds.south + 0.25, bounds.west + 0.25);
    text = `Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}\nDistância 1 quadrado: ${distanceSquare1.toFixed(2)}\nDistância 2 quadrado: ${distanceSquare2.toFixed(2)}\nTemperatura: ${loadingTemperature ? 'Atualizando...' : temperature ? `${temperature}°C` : 'Dados não disponíveis'}`;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>MAPA</Text>
      </View>
      <ImageBackground source={require('./mapa.png')} style={styles.map}>
        <View style={[styles.bolinha, calculatePosition()]} />
        <View style={[styles.quadrado, { top: '30%', left: '50%' }]} />
        <View style={[styles.quadrado, { top: '50%', left: '40%' }]} />
      </ImageBackground>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        {loadingTemperature && <ActivityIndicator size="small" color="#2596be" />}
      </View>
    </View>
  );
}

export default Mapa;
