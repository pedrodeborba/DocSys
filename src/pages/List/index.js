import React from "react";
import { Ionicons } from "react-native-vector-icons";
import {
    SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function List({navigation}) {
  const exit = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "FirstScreen" }],
    });
  };

  return (
    //Exibir a lista de todos os agendamentos que forem puxados do banco
    <SafeAreaView style={styles.body}>
        <View style={styles.topView}>
            <TouchableOpacity onPress={exit}>
            <Ionicons name="ios-arrow-back" size={24} color="#6F7BF7" />
            </TouchableOpacity>
        </View>
        <View style={styles.container}>
            <View style={styles.schedules}>
                <View style={styles.items}>
                <Text>Id do paciente</Text>
                </View>
                <View style={styles.items}>
                <Text>Data</Text>
                </View>
                <View style={styles.items}>
                <Text>Hora</Text>
                </View>
                <View style={styles.items}>
                <Text>Local</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: "#D8DDFC",
    },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    flexDirection: "row",
    rowGap: 20,
    paddingTop: 20,
    paddingLeft: 10,
  },
  schedules: {
    backgroundColor: "#D8DDFC",
    padding: 20,
    borderRadius: 20,
    margin: 10,
  },
  items: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 5,
    borderRadius: 5,
    margin: 5,
  },
});
