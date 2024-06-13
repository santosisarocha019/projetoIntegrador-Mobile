import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', // tom claro de roxo
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6A0DAD', // roxo escuro
    marginBottom: 20,
  },
  map: {
    marginTop: 20,
    width: width - 40,
    height: height / 2,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: '#D3D3D3',
    borderWidth: 1,
  },
  bolinha: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#D0D1FF', // tom lilás
    borderRadius: 10,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  quadrado: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#9370DB', // roxo médio
    borderRadius: 5,
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  textContainer: {
    backgroundColor: '#E6E6FA', // tom lavanda
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 15,
    width: 300,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: '#4B0082', // roxo escuro
    textAlign: 'center',
    lineHeight: 24,
  },
  loadingIndicator: {
    marginTop: 10,
  },
});
