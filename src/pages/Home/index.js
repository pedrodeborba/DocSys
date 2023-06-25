import { View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import {FontAwesome} from 'react-native-vector-icons'

export default function Home() {
    return(
        <SafeAreaView style={styles.body}>
            <View style={styles.header}>
                <Image 
                source={require('../../../assets/perfil.png')}
                style={{width:60, height: 60, marginLeft: 0}} 
                />
                <Text style={styles.headerText}>
                    Olá, Pedro{'\n'}
                    <Text style={styles.headerbText}>Do que você precisa?</Text>
                </Text>
                <FontAwesome name="bell-o" size={23} color="#6F7BF7" style={{marginLeft:45}} />
            </View>

            
            <View style={styles.sectionOne}>{/*section*/}
                <View style={styles.consultaMarcada}>
                    <View style={styles.halfA}>{/*Metade da div: Icon and Title*/}
                        <View style={styles.iconRadius}><FontAwesome name="calendar-o" size={23} color="#fff" /></View>
                        <Text style={styles.schedulingText}>Consulta marcada</Text>
                    </View>
                    <View style={styles.halfB}>
                        <View style={styles.options}>
                            <FontAwesome name="calendar-o" size={20} color="#6F7BF7" style={{marginRight:10}}/>
                            <Text style={styles.optionsText}>07/01</Text>
                        </View>
                        <View style={styles.options}>
                            <FontAwesome name="clock-o" size={25} color="#6F7BF7" style={{marginRight:10}}/>
                            <Text style={styles.optionsText}>14:00</Text>
                        </View>
                        <View style={styles.optionsEdit}>
                            <FontAwesome name="commenting-o" size={20} color="#fff" style={{marginRight:10}} />
                            <Text style={styles.optionsTextEdit}>Contatar</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.sectionTwo}>
                <View style={styles.box}>
                    <View>
                        
                    </View>
                    <View>

                    </View>
                </View>
            </View>
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
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
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
        height:180, 
        width: "100%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    schedulingText:{
        fontSize: 20,
        fontWeight: "bold",
        color:"#6F7BF7",
        marginLeft: 15
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
        height: 160,
        borderRadius: 10
    },
    halfA:{
        height:80,
        backgroundColor:"#D8DDFC",
        alignItems:"center",
        flexDirection: 'row',
        borderRadius: 10
    },
    halfB:{
        height:80,
        backgroundColor:"#D8DDFC",
        justifyContent:"center",
        alignItems:"center",
        flexDirection: 'row',
        borderRadius: 10
    },
    options:{
        width: 95,
        height: 50,
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
        height: 50,
        backgroundColor: "#6F7BF7",
        marginLeft: 5,
        borderRadius: 10,
        justifyContent: "center",
        alignItems:"center"
    },
    optionsTextEdit:{
        color: "#fff",
    },
    sectionTwo:{
        height: 140, 
        width: "100%",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    box:{
        width: "80%",
        height: 90,
        backgroundColor: "#000",
    },

    
})
