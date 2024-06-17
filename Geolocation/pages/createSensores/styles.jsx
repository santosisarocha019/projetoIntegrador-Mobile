import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D1FF',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    marginTop:60,
    width: 350,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  campos: {
    width: '100%',
    marginBottom: 10,
  },
  texto2: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  textoNomeEmail: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  addNew: {
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  btnBtn: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 10,
    width: '50%',
    height: 50,
    backgroundColor: '#C8E7FF',
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCadastrar: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoErro: {
    color: '#f00',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;
