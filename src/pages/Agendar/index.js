import React from 'react';
import {FontAwesome5} from 'react-native-vector-icons';

import { 
   StyleSheet,
   Text, 
   View, 
   SafeAreaView,
   TouchableOpacity,
   } from 'react-native';

export default function Agendar(){
    return(
        <SafeAreaView style = {styles.container}>
            <View style = {styles.topView}>
                <View style = {styles.iconLeft}>
                    <FontAwesome5 name="chevron-left" size={23} color="#fff" />
                </View>
                <View style = {styles.agendamentoTopView}>
                    <Text style = {styles.textTopView}>Agendamento</Text>
                </View>
            </View>

            <View style = {styles.section}>
                <TouchableOpacity style = {styles.buttonData}>
                    <View>
                        <FontAwesome5 name="calendar" size={25} color="#203F6B" />
                    </View>
                    <View>
                        <Text style = {styles.textData}>Julho</Text>
                    </View>
                    <View>
                        <FontAwesome5 name="chevron-down" size={25} color="#203F6B" />
                    </View>
                </TouchableOpacity>

                <View style = {styles.datas}>
                    <View style = {styles.lineDatas}>
                        {/* Adicionar as datas (segunda, terça, quarta) */}
                    </View>

                    <View style = {styles.lineDatas}>
                        {/* Adicionar as datas (quinta, sexta, sabado) */}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topView:{
        height: "10%",
        width: '100%',
        backgroundColor: "#6F7BF7",
        alignItems: "center",
        flexDirection: 'row',
        rowGap: 20,
        paddingTop: 20,
    },
    iconLeft:{
        width: "20%",
        alignItems: "center"
    },
    agendamentoTopView:{
        width: "80%",
        marginLeft: 50
    },
    textTopView:{
        fontSize: 25,
        color: "#fff"

    },
    section:{
        width: "100%",
        height: "40%",
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },
    buttonData:{
        width: 150,
        height: 50,
        backgroundColor: "#EDEFFF",
        flexDirection: "row",
        gap: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    textData:{
        color: "#203F6B",
    },
    datas:{
        width: "80%",
        height: 200,
        backgroundColor: "#fff",
        marginTop: 10,
        borderRadius: 10,
    },

});