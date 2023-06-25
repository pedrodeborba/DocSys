import React from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';


export default function FirstScreen({navigation}) {
    const ProfisEnter = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "Profissional"}],
        })
    }
    const PaciEnter = () => {
        navigation.reset({
            index: 0,
            routes: [{name: "Paciente"}],
        })
    }

    return(
        <View style={styles.container} >
            <View style={styles.divImg}>
                <Image source={require('../../../assets/logo.png')} style={styles.img}/>
            </View>
            <Text style={styles.textP}>Escolha o tipo de usuário</Text>
            <TouchableOpacity style={styles.button} onPress={()=>ProfisEnter()}>
                <Text style={styles.textButton}>Profissional</Text>
            </TouchableOpacity>
            <TouchableOpacity title="Sou Paciente" style={styles.button} onPress={()=>PaciEnter()}>
                <Text style={styles.textButton}>Paciente</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#D8DDFC",
        justifyContent: "center",
        alignItems: 'center',
    },
    divImg:{
        flex: 1,
        justifyContent: 'center',
    },
    img:{
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: "#6F7BF7",
        backgroundColor: "#6F7BF7",
        borderRadius: 20,
    },
    textP:{
        color: '#141414',
        marginBottom: 20,
    },
    button:{
        width: '90%',
        height: 50,
        backgroundColor: '#6F7BF7',
        marginBottom: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton:{
        fontWeight: "bold",
        color: "#fff",
    },

})