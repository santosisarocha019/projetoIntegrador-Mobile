import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D0D1FF', 
    },
    box:{     
        width: 350,
        height: 500,
        backgroundColor:'#FFFFFF',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 15,
        
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    campos: {
        width: '80%',
        marginBottom: 20,
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
        width: '80%',
        alignItems: 'center',
    },
    btn: {
        borderWidth:1,
        borderRadius:10,
        width:'50%',
        height:50,
        backgroundColor:'#C8E7FF',
        borderColor:'#E8E8E8', 
        alignItems:'center',
        justifyContent:'center',
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
