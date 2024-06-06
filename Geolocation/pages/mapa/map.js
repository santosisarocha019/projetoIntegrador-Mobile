import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const Stack = createStackNavigator();

export default function Mapa({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(null);
  const [temperature, setTemperature] = useState(null);

  const bounds = {
    north: -22.9140639,
    south: -22.914251,
    west: -47.068686,
    east: -47.067987,
  };

  const fetchTemperature = async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3NjczOTk4LCJpYXQiOjE3MTc2NzM2OTgsImp0aSI6IjZmMWRkNDBmYTk5NjQ2MjliNWEzMjhmMmJjZGM5YmY0IiwidXNlcl9pZCI6M30.crzRJI4Px3q_CTkyPklRsvmYat4l4CywMA-_ZnR9pHI';
    const params = {
      sensor_id: 9,
      valor_gte: 10,
      valor_lt: 19,
      timestamp_gte: "2024-04-01T00:00:00",
      timestamp_lt: "2024-04-02T00:00:00"
    };

    const query = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/temperatura_filter/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      if (data.length > 0) {
        setTemperature(data[0].valor);
      } else {
        setTemperature('No data found');
      }
    } catch (error) {
      console.error('Erro ao buscar a temperatura:', error);
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
    if (location) {
      const { latitude, longitude } = location;
      const distance = calculateDistance(latitude, longitude);
      setDistance(distance.toFixed(2));
    }
  }, [location]);

  useEffect(() => {
    fetchTemperature();
  }, []);

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
    text = `Latitude: ${latitude.toFixed(6)}\nLongitude: ${longitude.toFixed(6)}\nDistância 1 quadrado: ${distanceSquare1.toFixed(2)}\nDistância 2 quadrado: ${distanceSquare2.toFixed(2)}\nTemperatura: ${temperature ? `${temperature}°C` : 'Carregando...'}`;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./mapa.png')} style={styles.map}>
        <View style={[styles.bolinha, calculatePosition()]} />
        <View style={[styles.quadrado, { top: '30%', left: '50%' }]} />
        <View style={[styles.quadrado, { top: '50%', left: '40%' }]} />
      </ImageBackground>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Temperatura')} style={styles.button}>
        <Text style={styles.buttonText}>Dados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: width - 40,
    height: height / 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bolinha: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#92c1ba',
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  quadrado: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#2596be',
    borderRadius: 5,
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  textContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 30,
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
