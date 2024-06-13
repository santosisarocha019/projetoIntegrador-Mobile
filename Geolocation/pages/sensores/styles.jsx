import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#8B8DFE', 
  },
  sensorItem: {
    padding: 16,
    marginBottom: 12, 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#D0D1FF', 
    borderRadius: 10, 
  },
  sensorText: {
    fontSize: 16,
    color: '#000', 
  },
});
