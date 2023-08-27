import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity} from 'react-native';
import {FontAwesome} from 'react-native-vector-icons';
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {

    const [userName, setUserName] = useState('');

    useEffect(() => {
    const retrieveUserName = async () => {
        try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        } catch (error) {
        console.error('Erro ao recuperar o nome do usuário:', error);
        }
    };

    retrieveUserName();
    }, []);
  
    useEffect(() => {
    }, [userName]);

    const agendar = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Agendamento' }],
        });
    };

    return(
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Image 
                source={require('../../../assets/perfil.png')}
                style={{width:60, height: 60, marginLeft: 0}}
                />
                <Text style={styles.headerText}>
                    Olá, {userName}{'\n'}
                    <Text style={styles.headerbText}>Do que você precisa?</Text>
                </Text>
                <FontAwesome name="bell-o" size={23} color="#6F7BF7" style={{marginLeft:45}} />
            </View>
        
            <ScrollView>
                <View style = {styles.conteudo}>
                    <View style={styles.sectionOne}>{/*section*/}
                        <View style={styles.consultaMarcada}>
                            <View style={styles.halfA}>{/*Metade da div: Icon and Title*/}
                                <View style={styles.iconRadius}><MaterialCommunityIcons name="calendar-clock" size={23} color="#fff" /></View>
                                <Text style={styles.schedulingText}>Consulta marcada</Text>
                            </View>
                            <View style={styles.halfB}>
                                <View style={styles.options}>
                                    <FontAwesome name="calendar-o" size={20} color="#6F7BF7" style={{marginRight:10}}/>
                                    <Text style={styles.optionsText}>18/07</Text>
                                </View>
                                <View style={styles.options}>
                                    <FontAwesome name="clock-o" size={25} color="#6F7BF7" style={{marginRight:10}}/>
                                    <Text style={styles.optionsText}>17:15</Text>
                                </View>
                                <View style={styles.optionsEdit}>
                                    <FontAwesome name="commenting-o" size={20} color="#fff" style={{marginRight:10}} />
                                    <Text style={styles.optionsTextEdit}>Contatar</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={()=> agendar()}>
                                <View style={styles.stylingArea}>
                                    <View style={styles.iconRadius}><MaterialCommunityIcons name="calendar" size={23} color="#fff" /></View>
                                    <Text style={styles.schedulingText} >Agende sua consulta</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.box}>
                            <View style={styles.stylingArea}>
                                <View style={styles.iconRadius}><MaterialCommunityIcons name="calendar-cursor" size={23} color="#fff" /></View>
                                <Text style={styles.schedulingText}>Histórico de consultas</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.box}>
                            <View style={styles.stylingArea}>
                                <View>
                                    <Image style = {styles.imgFisio} source = {require("../../../assets/Fisioterapeuta.png")} />
                                </View>
                                <Text style={styles.textFisio}>João Borba</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "#fff"
    },
    header:{
        backgroundColor: "#EDEFFF",
        height: "15%",
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    conteudo:{
        marginBottom: 100,
    },
    headerText:{
        color: "#6F7BF7",
        marginLeft: 25,
        fontSize: 15
    },
    headerbText:{
        color: "#1E1E1E",
        marginLeft: 25,
        fontSize: 15
    },
    sectionOne:{
        height:220, 
        marginTop: 20,
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    schedulingText:{
        fontSize: 20,
        fontWeight: "bold",
        color:"#6F7BF7",
        marginLeft: 20
    },
    iconRadius:{
        height: 50,
        width: 50,
        borderRadius:50,
        backgroundColor: "#6F7BF7",
        marginLeft: 20,
        justifyContent:"center",
        alignItems: "center",
    },
    consultaMarcada:{
        backgroundColor:"#D8DDFC",
        width: "80%",
        height: 200,
        borderRadius: 10
    },
    halfA:{
        height: 100,
        alignItems:"center",
        flexDirection: 'row',
        borderRadius: 10
    },
    halfB:{
        height: 100,
        justifyContent:"center",
        alignItems:"center",
        flexDirection: 'row',
        borderRadius: 10
    },
    options:{
        width: 95,
        height: 60,
        backgroundColor: "#fff",
        marginLeft: 5,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems:"center"
    },
    optionsText:{
        color: "#6F7BF7",
        
    },
    optionsEdit:{
        width: 95,
        height: 60,
        backgroundColor: "#6F7BF7",
        marginLeft: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems:"center"
    },
    optionsTextEdit:{
        color: "#fff",
    },
    section:{
        marginTop: 20,
        height: 120,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    stylingArea:{
        height: 90,
        alignItems:"center",
        flexDirection: 'row',
        borderRadius: 10
    },
    box:{
        width: "80%",
        height: 90,
        backgroundColor:"#EDEFFF",
        borderWidth: 1,
        borderColor: "#6F7BF7",
        borderRadius: 20,
    },
    imgFisio:{
        height: 80,
        width: 80,
        marginLeft: 10,
    },
    textFisio:{
        fontSize: 20,
        fontWeight: "bold",
        color:"#6F7BF7",
        marginLeft: 40,
    },
})

